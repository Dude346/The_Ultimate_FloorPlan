import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

const statusEl = document.getElementById("status");
const fileInput = document.getElementById("fileInput");
const overlay = document.getElementById("overlay");
const enterButton = document.getElementById("enterButton");
const scaleDialog = document.getElementById("scaleDialog");
const scaleInput = document.getElementById("scaleInput");
const scaleApplyButton = document.getElementById("scaleApplyButton");
const scaleCancelButton = document.getElementById("scaleCancelButton");

let preferCleanView = true;
let currentHasVertexColor = false;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 5000);
camera.position.set(0, 1.5, 3);

const viewportSize = new THREE.Vector2();

const controls = new PointerLockControls(camera, document.body);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.95);
scene.add(hemisphereLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

const grid = new THREE.GridHelper(20, 20, 0xcbd5e1, 0xe2e8f0);
grid.position.y = -0.001;
scene.add(grid);

const worldRoot = new THREE.Group();
worldRoot.name = "worldRoot";
scene.add(worldRoot);

// Static environment (sceneMesh) stays outside this group.
// Every runtime-added asset should be attached under assetsGroup.
const assetsGroup = new THREE.Group();
assetsGroup.name = "assetsGroup";
worldRoot.add(assetsGroup);

// Scene-derived movable objects (e.g., separated mesh parts or standalone point clouds).
const sceneObjectsGroup = new THREE.Group();
sceneObjectsGroup.name = "sceneObjectsGroup";
worldRoot.add(sceneObjectsGroup);

// Top-right orientation widget (XYZ + coordinate planes).
const gizmoScene = new THREE.Scene();
const gizmoCamera = new THREE.PerspectiveCamera(40, 1, 0.01, 50);
gizmoCamera.position.set(0, 0, 5);
gizmoCamera.lookAt(0, 0, 0);

const gizmoRoot = new THREE.Group();
gizmoScene.add(gizmoRoot);

function createRoundedRectShape(x, y, width, height, radius) {
  const r = Math.min(radius, width * 0.5, height * 0.5);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

const gizmoFrameShape = createRoundedRectShape(-1.9, -1.9, 3.8, 3.8, 0.36);
const gizmoBg = new THREE.Mesh(
  new THREE.ShapeGeometry(gizmoFrameShape),
  new THREE.MeshBasicMaterial({ color: 0xffffff, depthWrite: false, depthTest: false, toneMapped: false }),
);
gizmoBg.position.z = -2.0;
gizmoScene.add(gizmoBg);

const gizmoBorder = new THREE.LineLoop(
  new THREE.BufferGeometry().setFromPoints(gizmoFrameShape.getPoints(64)),
  new THREE.LineBasicMaterial({ color: 0xcbd5e1, depthWrite: false, depthTest: false, toneMapped: false }),
);
gizmoBorder.position.z = -1.95;
gizmoScene.add(gizmoBorder);

const gizmoLight = new THREE.AmbientLight(0xffffff, 0.9);
gizmoScene.add(gizmoLight);
const axisLen = 0.86;
const axisHeadLength = 0.26;
const axisHeadWidth = 0.18;
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), axisLen, 0xff3b30, axisHeadLength, axisHeadWidth));
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), axisLen, 0x22c55e, axisHeadLength, axisHeadWidth));
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), axisLen, 0x2563eb, axisHeadLength, axisHeadWidth));

const planeMaterialXY = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
const planeMaterialXZ = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
const planeMaterialYZ = new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });

const planeXY = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), planeMaterialXY);
planeXY.position.set(0.45, 0.45, 0);
gizmoRoot.add(planeXY);
const planeXZ = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), planeMaterialXZ);
planeXZ.position.set(0.45, 0, 0.45);
planeXZ.rotation.x = -Math.PI / 2;
gizmoRoot.add(planeXZ);
const planeYZ = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), planeMaterialYZ);
planeYZ.position.set(0, 0.45, 0.45);
planeYZ.rotation.y = Math.PI / 2;
gizmoRoot.add(planeYZ);

const VIEWER_THEMES = {
  light: {
    background: 0xffffff,
    hemiSky: 0xffffff,
    hemiGround: 0xe2e8f0,
    hemiIntensity: 0.95,
    ambientIntensity: 0.45,
    dirColor: 0xffffff,
    dirIntensity: 0.75,
    gridMajor: 0xcbd5e1,
    gridMinor: 0xe2e8f0,
    gizmoBg: 0xffffff,
    gizmoBorder: 0xcbd5e1,
  },
  dark: {
    background: 0x06090f,
    hemiSky: 0xcbd5e1,
    hemiGround: 0x0f172a,
    hemiIntensity: 0.75,
    ambientIntensity: 0.34,
    dirColor: 0xe2e8f0,
    dirIntensity: 0.62,
    gridMajor: 0x334155,
    gridMinor: 0x1e293b,
    gizmoBg: 0x0f172a,
    gizmoBorder: 0x334155,
  },
};

function currentThemeName() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyViewerTheme(name) {
  const theme = VIEWER_THEMES[name] ?? VIEWER_THEMES.light;

  scene.background.setHex(theme.background);
  renderer.setClearColor(theme.background, 1);

  hemisphereLight.color.setHex(theme.hemiSky);
  hemisphereLight.groundColor.setHex(theme.hemiGround);
  hemisphereLight.intensity = theme.hemiIntensity;

  ambientLight.intensity = theme.ambientIntensity;
  dirLight.color.setHex(theme.dirColor);
  dirLight.intensity = theme.dirIntensity;

  const [majorMaterial, minorMaterial] = Array.isArray(grid.material) ? grid.material : [grid.material, null];
  majorMaterial?.color?.setHex(theme.gridMajor);
  minorMaterial?.color?.setHex(theme.gridMinor);

  gizmoBg.material.color.setHex(theme.gizmoBg);
  gizmoBorder.material.color.setHex(theme.gizmoBorder);
}

applyViewerTheme(currentThemeName());

if (typeof MutationObserver !== "undefined") {
  const themeObserver = new MutationObserver(() => {
    applyViewerTheme(currentThemeName());
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}


function createAxisLabel(text, fillColor) {
  const size = 96;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Object3D();
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.37, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = fillColor;
  ctx.stroke();
  ctx.font = "700 48px Inter, ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = fillColor;
  ctx.fillText(text, size / 2, size / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }),
  );
  sprite.scale.set(0.33, 0.33, 1);
  return sprite;
}

const labelX = createAxisLabel("X", "#ff3b30");
labelX.position.set(1.04, 0, 0);
gizmoRoot.add(labelX);
const labelY = createAxisLabel("Y", "#22c55e");
labelY.position.set(0, 1.04, 0);
gizmoRoot.add(labelY);
const labelZ = createAxisLabel("Z", "#2563eb");
labelZ.position.set(0, 0, 1.04);
gizmoRoot.add(labelZ);

let currentMesh = null;
let sceneMesh = null;
const loader = new PLYLoader();
const FIXED_ROT_X = -Math.PI / 2; // fixed default orientation
const HEADER_SCAN_BYTES = 64 * 1024;
const SH_C0 = 0.28209479177387814;
const POINT_DENSITY_MULTIPLIER_RAW = 1.6;
const POINT_DENSITY_MULTIPLIER_SPLAT = 1.35;
const POINT_DENSITY_SCALE_MIN = 0.5;
const POINT_DENSITY_SCALE_MAX = 2.5;
const MAX_SPLIT_FACE_COUNT = 1_500_000;
const MAX_SPLIT_COMPONENTS = 2000;
const MIN_COMPONENT_FACES = 12;
let pointDensityScale = 1.0;

const keyState = new Map();
const moveForward = new THREE.Vector3();
const moveRight = new THREE.Vector3();
const WORLD_UP = new THREE.Vector3(0, 1, 0);
let lastTime = performance.now();

const baseSpeed = 3.0;
const sprintMultiplier = 2.0;
const verticalSpeed = 2.8;

const assetIdCounters = new Map();

const raycaster = new THREE.Raycaster();
const centerNDC = new THREE.Vector2(0, 0);
const tmpWorldPos = new THREE.Vector3();
const tmpWorldTarget = new THREE.Vector3();
const tmpLocalTarget = new THREE.Vector3();
const tmpBoxCenter = new THREE.Vector3();
const tmpDropForward = new THREE.Vector3();
const MAX_PICK_DISTANCE = 200.0;
const DROP_DISTANCE = 0.3; // place slightly in front of the camera, in full 3D space

let selected = null;
let heldAsset = null;
let heldCenterOffsetX = 0;
let heldCenterOffsetZ = 0;
let heldCenterOffsetY = 0;
let selectionOutline = null;
let orbitWasEnabled = null;
let scaleDialogOpen = false;
let relockAfterScaleDialog = false;
let ignoreNextUnlockEndDrag = false;

function setStatus(text) {
  statusEl.textContent = text;
}

function isViewerLocked() {
  const pe = document.pointerLockElement;
  return controls.isLocked || pe === document.body || pe === renderer.domElement;
}

function updateOverlay() {
  const showOverlay = !isViewerLocked();
  overlay.classList.toggle("hidden", !showOverlay);
}

function isPressed(code) {
  return keyState.get(code) === true;
}

function sanitizeAssetType(assetType) {
  const cleaned = String(assetType ?? "asset")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return cleaned || "asset";
}

function nextAssetId(assetType = "asset") {
  const key = sanitizeAssetType(assetType);
  const next = (assetIdCounters.get(key) ?? 0) + 1;
  assetIdCounters.set(key, next);
  return `${key}_${next}`;
}

// Register a runtime asset root under assetsGroup so it can be selected/moved.
function addAssetToGroup(assetRoot, assetType = "asset") {
  if (!assetRoot) return null;
  if (assetRoot.parent && assetRoot.parent !== assetsGroup) {
    assetRoot.parent.remove(assetRoot);
  }
  assetsGroup.add(assetRoot);
  assetRoot.userData.movable = true;
  if (!assetRoot.userData.assetId) {
    assetRoot.userData.assetId = nextAssetId(assetType);
  }
  return assetRoot;
}

// Expose helper for other modules that dynamically add assets.
window.addAssetToGroup = addAssetToGroup;

function addSceneObjectToGroup(objectRoot, objectType = "scene_object") {
  if (!objectRoot) return null;
  if (objectRoot.parent && objectRoot.parent !== sceneObjectsGroup) {
    objectRoot.parent.remove(objectRoot);
  }
  sceneObjectsGroup.add(objectRoot);
  objectRoot.userData.movable = true;
  if (!objectRoot.userData.assetId) {
    objectRoot.userData.assetId = nextAssetId(objectType);
  }
  return objectRoot;
}

function getAssetRootFromObject(hitObject) {
  let node = hitObject;
  while (node && node.parent && node.parent !== assetsGroup && node.parent !== sceneObjectsGroup) {
    node = node.parent;
  }
  if (!node || (node.parent !== assetsGroup && node.parent !== sceneObjectsGroup)) return null;
  return node.userData?.movable ? node : null;
}

function pickAssetFromViewCenter() {
  raycaster.setFromCamera(centerNDC, camera);
  const roots = [...assetsGroup.children, ...sceneObjectsGroup.children];
  const hits = raycaster.intersectObjects(roots, true);
  if (hits.length === 0) return null;
  if (hits[0].distance > MAX_PICK_DISTANCE) return null;
  return getAssetRootFromObject(hits[0].object);
}

function clearSelection() {
  selected = null;
  heldAsset = null;
  heldCenterOffsetX = 0;
  heldCenterOffsetZ = 0;
  heldCenterOffsetY = 0;
  if (selectionOutline) {
    worldRoot.remove(selectionOutline);
    selectionOutline = null;
  }
}

function setSelection(assetRoot) {
  if (selected === assetRoot) return;
  clearSelection();
  selected = assetRoot;
  if (!selected) return;
  selectionOutline = new THREE.BoxHelper(selected, 0x2a9dff);
  worldRoot.add(selectionOutline);
}

function getOrbitControlsIfPresent() {
  if (typeof orbitControls !== "undefined" && orbitControls) return orbitControls;
  if (globalThis.orbitControls) return globalThis.orbitControls;
  return null;
}

function disableOrbitDuringDrag() {
  const orbit = getOrbitControlsIfPresent();
  orbitWasEnabled = orbit ? orbit.enabled : null;
  if (orbit) orbit.enabled = false;
}

function restoreOrbitAfterDrag() {
  if (orbitWasEnabled === null) return;
  const orbit = getOrbitControlsIfPresent();
  if (orbit) orbit.enabled = orbitWasEnabled;
  orbitWasEnabled = null;
}

function refreshHeldOffsets() {
  if (!selected) return;

  const wasVisible = selected.visible;
  selected.visible = true;
  selected.updateMatrixWorld(true);
  selected.getWorldPosition(tmpWorldPos);
  const bbox = new THREE.Box3().setFromObject(selected);
  if (!bbox.isEmpty()) {
    bbox.getCenter(tmpBoxCenter);
    heldCenterOffsetX = tmpBoxCenter.x - tmpWorldPos.x;
    heldCenterOffsetZ = tmpBoxCenter.z - tmpWorldPos.z;
    heldCenterOffsetY = tmpBoxCenter.y - tmpWorldPos.y;
  } else {
    heldCenterOffsetX = 0;
    heldCenterOffsetZ = 0;
    heldCenterOffsetY = 0;
  }
  selected.visible = wasVisible;
}

function closeScaleDialog({ relock = true } = {}) {
  if (!scaleDialog || !scaleInput) return;
  scaleDialog.classList.add("hidden");
  scaleDialogOpen = false;
  if (relock && relockAfterScaleDialog && !isViewerLocked()) {
    controls.lock();
  }
  relockAfterScaleDialog = false;
}

function applyScaleFromDialog() {
  if (!heldAsset || !selected) {
    closeScaleDialog({ relock: true });
    return;
  }
  if (!scaleInput) return;

  const raw = scaleInput.value.trim();
  const factor = Number(raw);
  if (!Number.isFinite(factor) || factor <= 0) {
    setStatus("Scale must be a positive number (e.g. 0.5, 1, 2).");
    scaleInput.focus();
    scaleInput.select();
    return;
  }

  selected.scale.multiplyScalar(factor);
  refreshHeldOffsets();
  closeScaleDialog({ relock: true });
  setStatus(`Scaled ${selected.userData?.assetId ?? "asset"} by x${factor}. Press G to place.`);
}

function openScaleDialog() {
  if (!heldAsset || !selected) {
    setStatus("Pick up an asset first (F), then press + to scale.");
    return;
  }
  if (!scaleDialog || !scaleInput) return;

  relockAfterScaleDialog = isViewerLocked();
  if (relockAfterScaleDialog) {
    ignoreNextUnlockEndDrag = true;
    controls.unlock();
  }

  scaleInput.value = "2";
  scaleDialog.classList.remove("hidden");
  scaleDialogOpen = true;
  scaleInput.focus();
  scaleInput.select();
}

function updateHeldAssetPosition() {
  // Held assets are hidden while carried, so no per-frame movement is required.
}

function renderOrientationGizmo() {
  renderer.getSize(viewportSize);
  const width = viewportSize.x;
  const height = viewportSize.y;
  const size = Math.round(Math.min(width, height) * 0.25);
  const margin = 0;
  const x = width - size - margin;
  const y = height - size - margin;

  gizmoRoot.quaternion.copy(camera.quaternion).invert();

  const prevAutoClear = renderer.autoClear;
  renderer.autoClear = false;
  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setViewport(x, y, size, size);
  renderer.setScissor(x, y, size, size);
  renderer.render(gizmoScene, gizmoCamera);
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, width, height);
  renderer.autoClear = prevAutoClear;
}

function pickUpAssetInView() {
  if (!isViewerLocked()) {
    setStatus("Click 'Click to enter' first, then aim and press F.");
    return;
  }
  if (heldAsset) {
    setStatus(`Already holding ${heldAsset.userData?.assetId ?? "asset"}. Press G to place.`);
    return;
  }

  const picked = pickAssetFromViewCenter();
  if (!picked) {
    clearSelection();
    setStatus("No movable object in range. Move closer and aim at the target, then press F.");
    return;
  }

  setSelection(picked);
  heldAsset = selected;
  refreshHeldOffsets();
  selected.visible = false;
  if (selectionOutline) {
    worldRoot.remove(selectionOutline);
    selectionOutline = null;
  }
  disableOrbitDuringDrag();
  setStatus(`Picked ${selected.userData?.assetId ?? "asset"}. It is hidden while carried. Press G to place at your position.`);
}

function placeHeldAsset() {
  if (!heldAsset || !selected) {
    setStatus("No held asset. Aim at one and press F.");
    return;
  }
  const assetId = selected.userData?.assetId ?? "asset";
  camera.getWorldDirection(tmpDropForward);
  if (tmpDropForward.lengthSq() < 1e-8) {
    tmpDropForward.set(0, 0, -1);
  } else {
    tmpDropForward.normalize();
  }
  const targetCenterX = camera.position.x + tmpDropForward.x * DROP_DISTANCE;
  const targetCenterY = camera.position.y + tmpDropForward.y * DROP_DISTANCE;
  const targetCenterZ = camera.position.z + tmpDropForward.z * DROP_DISTANCE;
  const targetOriginX = targetCenterX - heldCenterOffsetX;
  const targetOriginY = targetCenterY - heldCenterOffsetY;
  const targetOriginZ = targetCenterZ - heldCenterOffsetZ;
  tmpWorldTarget.set(targetOriginX, targetOriginY, targetOriginZ);
  if (selected.parent) {
    tmpLocalTarget.copy(tmpWorldTarget);
    selected.parent.worldToLocal(tmpLocalTarget);
    selected.position.copy(tmpLocalTarget);
  } else {
    selected.position.copy(tmpWorldTarget);
  }
  selected.visible = true;
  if (!selectionOutline) {
    selectionOutline = new THREE.BoxHelper(selected, 0x2a9dff);
    worldRoot.add(selectionOutline);
  } else {
    selectionOutline.update();
  }
  endDrag();
  setStatus(`Placed ${assetId} at your location.`);
}

function endDrag() {
  closeScaleDialog({ relock: false });
  if (heldAsset) {
    heldAsset.visible = true;
  }
  heldAsset = null;
  heldCenterOffsetX = 0;
  heldCenterOffsetZ = 0;
  heldCenterOffsetY = 0;
  restoreOrbitAfterDrag();
}

function disposeMaterial(material) {
  if (!material) return;
  for (const value of Object.values(material)) {
    if (value?.isTexture) value.dispose();
  }
  material.dispose();
}

function disposeObject3D(root) {
  if (!root) return;
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (Array.isArray(obj.material)) {
      obj.material.forEach(disposeMaterial);
    } else if (obj.material) {
      disposeMaterial(obj.material);
    }
  });
}

function disposeCurrentMesh() {
  endDrag();
  clearSelection();

  while (sceneObjectsGroup.children.length > 0) {
    const sceneObj = sceneObjectsGroup.children[0];
    sceneObjectsGroup.remove(sceneObj);
    disposeObject3D(sceneObj);
  }

  while (assetsGroup.children.length > 0) {
    const asset = assetsGroup.children[0];
    assetsGroup.remove(asset);
    disposeObject3D(asset);
  }

  if (currentMesh) {
    worldRoot.remove(currentMesh);
    disposeObject3D(currentMesh);
  }
  currentMesh = null;
  sceneMesh = null;
}

function applySceneRotation() {
  worldRoot.rotation.set(FIXED_ROT_X, 0, 0);
  worldRoot.updateMatrixWorld(true);
}

function fitCameraToMesh(mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  if (box.isEmpty()) return;

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const radius = Math.max(size.length() * 0.5, 1e-4);

  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  const dist = radius / Math.tan(fovRad / 2);
  const distance = dist * 1.2;

  const dir = new THREE.Vector3(1, 0.5, 1).normalize();
  camera.position.copy(center).addScaledVector(dir, distance);

  camera.near = Math.max(radius / 1000, 0.001);
  camera.far = Math.max(radius * 20, 1000);
  camera.updateProjectionMatrix();

  camera.lookAt(center);
}

function readPlyHeader(arrayBuffer) {
  const byteCount = Math.min(arrayBuffer.byteLength, HEADER_SCAN_BYTES);
  const headerChunk = new Uint8Array(arrayBuffer, 0, byteCount);
  const headerText = new TextDecoder("latin1").decode(headerChunk);
  const endMarker = "end_header";
  const endIndex = headerText.indexOf(endMarker);
  return endIndex >= 0 ? headerText.slice(0, endIndex + endMarker.length) : headerText;
}

function parseFaceCountFromHeader(headerText) {
  const match = headerText.match(/element\s+face\s+(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function parseMergedLayerMetadata(headerText) {
  const sceneVertexMatch = headerText.match(/comment\s+floorplan_scene_vertex_count\s+(\d+)/i);
  const assetNameMatch = headerText.match(/comment\s+floorplan_asset_name\s+([^\r\n]+)/i);
  if (!sceneVertexMatch) return null;
  return {
    sceneVertexCount: Number(sceneVertexMatch[1]),
    assetName: assetNameMatch ? assetNameMatch[1].trim() : "asset",
  };
}

function cloneAttributeRange(attribute, vertexStart, vertexEnd) {
  const itemSize = attribute.itemSize;
  const start = vertexStart * itemSize;
  const end = vertexEnd * itemSize;
  const source = attribute.array;
  const sliced = source.slice(start, end);
  return new THREE.BufferAttribute(sliced, itemSize, attribute.normalized);
}

function createIndexAttribute(indexArray, vertexCount) {
  const maxIndex = vertexCount - 1;
  const indexType = maxIndex <= 65535 ? Uint16Array : Uint32Array;
  return new THREE.BufferAttribute(new indexType(indexArray), 1);
}

function splitMergedMeshGeometry(geometry, sceneVertexCount) {
  const position = geometry.getAttribute("position");
  if (!position || !geometry.index) return null;
  const totalVertices = position.count;
  if (sceneVertexCount <= 0 || sceneVertexCount >= totalVertices) return null;

  const index = geometry.index.array;
  const sceneIndices = [];
  const assetIndices = [];
  for (let i = 0; i + 2 < index.length; i += 3) {
    const a = index[i];
    const b = index[i + 1];
    const c = index[i + 2];
    const inScene = a < sceneVertexCount && b < sceneVertexCount && c < sceneVertexCount;
    const inAsset = a >= sceneVertexCount && b >= sceneVertexCount && c >= sceneVertexCount;
    if (inScene) {
      sceneIndices.push(a, b, c);
    } else if (inAsset) {
      assetIndices.push(a - sceneVertexCount, b - sceneVertexCount, c - sceneVertexCount);
    }
  }
  if (sceneIndices.length === 0 || assetIndices.length === 0) return null;

  const sceneGeometry = new THREE.BufferGeometry();
  const assetGeometry = new THREE.BufferGeometry();
  for (const [name, attribute] of Object.entries(geometry.attributes)) {
    sceneGeometry.setAttribute(name, cloneAttributeRange(attribute, 0, sceneVertexCount));
    assetGeometry.setAttribute(name, cloneAttributeRange(attribute, sceneVertexCount, totalVertices));
  }
  sceneGeometry.setIndex(createIndexAttribute(sceneIndices, sceneVertexCount));
  assetGeometry.setIndex(createIndexAttribute(assetIndices, totalVertices - sceneVertexCount));
  return { sceneGeometry, assetGeometry };
}

function isNerfstudioSplatHeader(headerText) {
  const h = headerText.toLowerCase();
  return h.includes("generated by nerstudio") || (h.includes("f_dc_0") && h.includes("opacity") && h.includes("scale_0"));
}

function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

function sigmoid(x) {
  if (x >= 0) {
    const z = Math.exp(-x);
    return 1 / (1 + z);
  }
  const z = Math.exp(x);
  return z / (1 + z);
}

function estimateColorScale(colorAttr) {
  if (!colorAttr || colorAttr.count === 0) return 1;
  const sampleCount = Math.min(colorAttr.count, 4096);
  let maxValue = 0;
  const stride = Math.max(1, Math.floor(colorAttr.count / sampleCount));
  for (let i = 0; i < colorAttr.count; i += stride) {
    maxValue = Math.max(maxValue, colorAttr.getX(i), colorAttr.getY(i), colorAttr.getZ(i));
  }
  return maxValue > 1.5 ? 255 : 1;
}

function computePointSize(geometry, hasSplatScales) {
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  if (!bbox || bbox.isEmpty()) return 0.01;
  const diag = bbox.getSize(new THREE.Vector3()).length();
  const base = hasSplatScales ? diag * 0.0018 : diag * 0.001;
  const multiplier = hasSplatScales ? POINT_DENSITY_MULTIPLIER_SPLAT : POINT_DENSITY_MULTIPLIER_RAW;
  return THREE.MathUtils.clamp(base * multiplier, 0.0035, 0.12);
}

function normalizePointCloudContrast(colorArray) {
  if (!colorArray || colorArray.length < 3) return;
  let lumaSum = 0;
  const count = colorArray.length / 3;
  for (let i = 0; i < colorArray.length; i += 3) {
    lumaSum += 0.2126 * colorArray[i] + 0.7152 * colorArray[i + 1] + 0.0722 * colorArray[i + 2];
  }
  const avgLuma = lumaSum / count;
  if (avgLuma <= 0.78) return;

  // White viewer background can wash out very bright point clouds.
  const darken = 0.68;
  for (let i = 0; i < colorArray.length; i += 1) {
    colorArray[i] = clamp01(colorArray[i] * darken);
  }
}

function applyPointDensityScale() {
  if (!currentMesh?.isPoints || !currentMesh.material) return;
  const baseSize = currentMesh.userData?.basePointSize;
  if (!Number.isFinite(baseSize)) return;
  currentMesh.material.size = THREE.MathUtils.clamp(baseSize * pointDensityScale, 0.001, 0.2);
  currentMesh.material.needsUpdate = true;
}

function recomputeAndSanitizeNormals(geometry) {
  geometry.deleteAttribute("normal");
  geometry.computeVertexNormals();

  const normal = geometry.getAttribute("normal");
  if (!normal) return;
  for (let i = 0; i < normal.count; i += 1) {
    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);
    if (!Number.isFinite(nx) || !Number.isFinite(ny) || !Number.isFinite(nz)) {
      normal.setXYZ(i, 0, 1, 0);
    }
  }
  normal.needsUpdate = true;
}

function denoiseSparseBlackVertexColors(color) {
  if (!color) return 0;

  let maxValue = 0;
  for (let i = 0; i < color.count; i += 1) {
    maxValue = Math.max(maxValue, color.getX(i), color.getY(i), color.getZ(i));
  }
  const scale = maxValue > 1.5 ? 255.0 : 1.0;
  const blackThreshold = 0.02 * scale;
  const liftValue = 0.10 * scale;

  const darkIdx = [];
  for (let i = 0; i < color.count; i += 1) {
    const r = color.getX(i);
    const g = color.getY(i);
    const b = color.getZ(i);
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma < blackThreshold) darkIdx.push(i);
  }

  if (darkIdx.length === 0) return 0;
  if (darkIdx.length / color.count > 0.02) return 0;

  for (const i of darkIdx) {
    color.setXYZ(i, liftValue, liftValue, liftValue);
  }
  color.needsUpdate = true;
  return darkIdx.length;
}

function smoothTriangleColorOutliers(geometry, color) {
  if (!color) return 0;

  const maxValue = (() => {
    let v = 0;
    for (let i = 0; i < color.count; i += 1) {
      v = Math.max(v, color.getX(i), color.getY(i), color.getZ(i));
    }
    return v;
  })();
  const scale = maxValue > 1.5 ? 255.0 : 1.0;
  const dark = 0.12 * scale;
  const bright = 0.98 * scale;
  const outlierThreshold = 0.22 * scale;
  const blend = 0.7;

  const index = geometry.index?.array;
  const vertexCount = geometry.attributes.position?.count ?? 0;
  let changed = 0;

  const processTri = (ia, ib, ic) => {
    const ca = [color.getX(ia), color.getY(ia), color.getZ(ia)];
    const cb = [color.getX(ib), color.getY(ib), color.getZ(ib)];
    const cc = [color.getX(ic), color.getY(ic), color.getZ(ic)];

    const luma = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    const dist = (u, v) => Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]);
    const avg = (u, v) => [(u[0] + v[0]) * 0.5, (u[1] + v[1]) * 0.5, (u[2] + v[2]) * 0.5];
    const blendTo = (from, to) => [
      from[0] + (to[0] - from[0]) * blend,
      from[1] + (to[1] - from[1]) * blend,
      from[2] + (to[2] - from[2]) * blend,
    ];

    const fix = (idx, cSelf, cU, cV) => {
      const lu = luma(cSelf);
      const target = avg(cU, cV);
      if (dist(cSelf, target) > outlierThreshold && (lu < dark || lu > bright)) {
        const cNew = blendTo(cSelf, target);
        color.setXYZ(idx, cNew[0], cNew[1], cNew[2]);
        changed += 1;
      }
    };

    fix(ia, ca, cb, cc);
    fix(ib, cb, ca, cc);
    fix(ic, cc, ca, cb);
  };

  if (index && index.length >= 3) {
    for (let i = 0; i + 2 < index.length; i += 3) {
      processTri(index[i], index[i + 1], index[i + 2]);
    }
  } else {
    for (let i = 0; i + 2 < vertexCount; i += 3) {
      processTri(i, i + 1, i + 2);
    }
  }

  color.needsUpdate = true;
  return changed;
}

function prepareColorModes(geometry) {
  const raw = geometry.getAttribute("color");
  if (!raw) return { hasColor: false, cleanedCount: 0 };

  const rawAttr = raw.clone();
  const cleanAttr = raw.clone();
  const darkSpeckles = denoiseSparseBlackVertexColors(cleanAttr);
  const triSpeckles = smoothTriangleColorOutliers(geometry, cleanAttr);

  geometry.setAttribute("color_raw", rawAttr);
  geometry.setAttribute("color_clean", cleanAttr);
  geometry.setAttribute("color", preferCleanView ? cleanAttr : rawAttr);
  return { hasColor: true, cleanedCount: darkSpeckles + triSpeckles };
}

function buildMeshFromGeometry(geometry, { denoise = true } = {}) {
  recomputeAndSanitizeNormals(geometry);
  geometry.computeBoundingBox();

  const prep = denoise
    ? prepareColorModes(geometry)
    : { hasColor: Boolean(geometry.getAttribute("color")), cleanedCount: 0 };
  const { hasColor, cleanedCount } = prep;
  currentHasVertexColor = hasColor;

  const material = new THREE.MeshLambertMaterial({
    color: hasColor ? 0xffffff : 0xbac2cd,
    vertexColors: hasColor,
    side: THREE.FrontSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return { object: mesh, denoisedCount: cleanedCount, denoiseLabel: "color outliers", renderMode: "mesh" };
}

function buildGeometryFromIndexSubset(sourceGeometry, subsetIndex) {
  const sourcePosition = sourceGeometry.getAttribute("position");
  if (!sourcePosition || subsetIndex.length < 3) return null;

  const remap = new Map();
  const oldByNew = [];
  const remapped = new Uint32Array(subsetIndex.length);
  let nextVertex = 0;

  for (let i = 0; i < subsetIndex.length; i += 1) {
    const oldIndex = subsetIndex[i];
    let newIndex = remap.get(oldIndex);
    if (newIndex === undefined) {
      newIndex = nextVertex;
      remap.set(oldIndex, newIndex);
      oldByNew.push(oldIndex);
      nextVertex += 1;
    }
    remapped[i] = newIndex;
  }

  const outGeometry = new THREE.BufferGeometry();
  for (const [name, attr] of Object.entries(sourceGeometry.attributes)) {
    const src = attr.array;
    const itemSize = attr.itemSize;
    const Ctor = src.constructor;
    const out = new Ctor(nextVertex * itemSize);

    for (let newIdx = 0; newIdx < nextVertex; newIdx += 1) {
      const oldIdx = oldByNew[newIdx];
      const srcOffset = oldIdx * itemSize;
      const dstOffset = newIdx * itemSize;
      for (let c = 0; c < itemSize; c += 1) {
        out[dstOffset + c] = src[srcOffset + c];
      }
    }
    outGeometry.setAttribute(name, new THREE.BufferAttribute(out, itemSize, attr.normalized));
  }

  const IndexCtor = nextVertex <= 65535 ? Uint16Array : Uint32Array;
  outGeometry.setIndex(new THREE.BufferAttribute(new IndexCtor(remapped), 1));
  outGeometry.computeBoundingBox();
  outGeometry.computeBoundingSphere();
  return outGeometry;
}

function splitMeshIntoLooseParts(geometry) {
  if (!geometry?.index) return null;
  const position = geometry.getAttribute("position");
  if (!position) return null;

  const index = geometry.index.array;
  const faceCount = Math.floor(index.length / 3);
  if (faceCount < 2 || faceCount > MAX_SPLIT_FACE_COUNT) return null;

  const vertexCount = position.count;
  const parent = new Int32Array(vertexCount);
  const rank = new Uint8Array(vertexCount);
  for (let i = 0; i < vertexCount; i += 1) parent[i] = i;

  const find = (x) => {
    let p = x;
    while (parent[p] !== p) {
      parent[p] = parent[parent[p]];
      p = parent[p];
    }
    return p;
  };
  const union = (a, b) => {
    let ra = find(a);
    let rb = find(b);
    if (ra === rb) return;
    const rka = rank[ra];
    const rkb = rank[rb];
    if (rka < rkb) {
      parent[ra] = rb;
    } else if (rka > rkb) {
      parent[rb] = ra;
    } else {
      parent[rb] = ra;
      rank[ra] += 1;
    }
  };

  for (let i = 0; i + 2 < index.length; i += 3) {
    const a = index[i];
    const b = index[i + 1];
    const c = index[i + 2];
    union(a, b);
    union(b, c);
  }

  const rootToComp = new Map();
  const compFaceCounts = [];
  for (let i = 0; i + 2 < index.length; i += 3) {
    const root = find(index[i]);
    let comp = rootToComp.get(root);
    if (comp === undefined) {
      comp = compFaceCounts.length;
      rootToComp.set(root, comp);
      compFaceCounts.push(0);
    }
    compFaceCounts[comp] += 1;
  }

  const componentCount = compFaceCounts.length;
  if (componentCount <= 1) return null;
  if (componentCount > MAX_SPLIT_COMPONENTS) return null;

  const largestFaceCount = compFaceCounts.reduce((m, n) => Math.max(m, n), 0);
  if (largestFaceCount / faceCount > 0.995) return null;

  const compIndices = compFaceCounts.map((count) => new Uint32Array(count * 3));
  const writeOffsets = new Uint32Array(componentCount);

  for (let i = 0; i + 2 < index.length; i += 3) {
    const comp = rootToComp.get(find(index[i]));
    const out = compIndices[comp];
    const off = writeOffsets[comp];
    out[off] = index[i];
    out[off + 1] = index[i + 1];
    out[off + 2] = index[i + 2];
    writeOffsets[comp] = off + 3;
  }

  const order = [...Array(componentCount).keys()].sort((a, b) => compFaceCounts[b] - compFaceCounts[a]);
  const parts = [];
  for (const comp of order) {
    const compFaces = compFaceCounts[comp];
    if (compFaces < MIN_COMPONENT_FACES) continue;
    const partGeometry = buildGeometryFromIndexSubset(geometry, compIndices[comp]);
    if (!partGeometry) continue;
    parts.push({ geometry: partGeometry, faceCount: compFaces });
  }

  if (parts.length <= 1) return null;
  return { parts, faceCount, componentCount: parts.length };
}

function buildPointCloudFromGeometry(geometry, { isSplatLike }) {
  geometry.computeBoundingBox();

  const position = geometry.getAttribute("position");
  if (!position) {
    const empty = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: 0xbac2cd, size: 0.01 }));
    return { object: empty, denoisedCount: 0, denoiseLabel: "points", renderMode: "points" };
  }

  const count = position.count;
  const rawColor = geometry.getAttribute("color");
  const opacity = geometry.getAttribute("opacity");
  const sh0 = geometry.getAttribute("f_dc_0");
  const sh1 = geometry.getAttribute("f_dc_1");
  const sh2 = geometry.getAttribute("f_dc_2");

  const colorScale = estimateColorScale(rawColor);
  const hasSHColor = Boolean(sh0 && sh1 && sh2);

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  let writeCount = 0;
  let removedOpacity = 0;

  for (let i = 0; i < count; i += 1) {
    if (opacity) {
      const alpha = sigmoid(opacity.getX(i));
      if (alpha <= 0.02) {
        removedOpacity += 1;
        continue;
      }
    }

    const w = writeCount * 3;
    positions[w] = position.getX(i);
    positions[w + 1] = position.getY(i);
    positions[w + 2] = position.getZ(i);

    if (hasSHColor) {
      colors[w] = clamp01(0.5 + SH_C0 * sh0.getX(i));
      colors[w + 1] = clamp01(0.5 + SH_C0 * sh1.getX(i));
      colors[w + 2] = clamp01(0.5 + SH_C0 * sh2.getX(i));
    } else if (rawColor) {
      colors[w] = clamp01(rawColor.getX(i) / colorScale);
      colors[w + 1] = clamp01(rawColor.getY(i) / colorScale);
      colors[w + 2] = clamp01(rawColor.getZ(i) / colorScale);
    } else {
      colors[w] = 0.82;
      colors[w + 1] = 0.84;
      colors[w + 2] = 0.88;
    }

    writeCount += 1;
  }

  const finalPositions = writeCount === count ? positions : positions.slice(0, writeCount * 3);
  const finalColors = writeCount === count ? colors : colors.slice(0, writeCount * 3);
  normalizePointCloudContrast(finalColors);

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(finalPositions, 3));
  pointsGeometry.setAttribute("color", new THREE.Float32BufferAttribute(finalColors, 3));
  pointsGeometry.computeBoundingBox();
  pointsGeometry.computeBoundingSphere();

  const hasSplatScales = Boolean(
    geometry.getAttribute("scale_0") && geometry.getAttribute("scale_1") && geometry.getAttribute("scale_2"),
  );
  const pointSize = computePointSize(pointsGeometry, hasSplatScales);

  const material = new THREE.PointsMaterial({
    size: pointSize,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: isSplatLike ? 0.95 : 1.0,
    depthWrite: false,
  });

  const points = new THREE.Points(pointsGeometry, material);
  points.frustumCulled = false;
  points.castShadow = false;
  points.receiveShadow = false;
  points.userData.basePointSize = pointSize;

  return {
    object: points,
    denoisedCount: removedOpacity,
    denoiseLabel: "low-opacity points",
    renderMode: isSplatLike ? "gaussian-points" : "point-cloud",
  };
}

function loadGeometryFromArrayBuffer(arrayBuffer, label) {
  const header = readPlyHeader(arrayBuffer);
  const faceCount = parseFaceCountFromHeader(header);
  const headerSplat = isNerfstudioSplatHeader(header);
  const mergedMeta = parseMergedLayerMetadata(header);
  const geometry = loader.parse(arrayBuffer);

  const hasIndexFaces = Boolean(geometry.index && geometry.index.count >= 3);
  const attrNames = Object.keys(geometry.attributes ?? {});
  const attrSplat = attrNames.includes("f_dc_0") && attrNames.includes("opacity") && attrNames.includes("scale_0");
  const isSplatLike = headerSplat || attrSplat;
  const shouldRenderAsMesh = faceCount > 0 || hasIndexFaces;

  disposeCurrentMesh();
  const count = geometry.attributes.position?.count ?? 0;
  const rotDeg = Math.round((FIXED_ROT_X * 180) / Math.PI);

  // If this is a merged scene+asset file written by place_asset_in_scene.py,
  // split it into static sceneMesh + movable asset mesh.
  if (shouldRenderAsMesh && mergedMeta) {
    const split = splitMergedMeshGeometry(geometry, mergedMeta.sceneVertexCount);
    if (split) {
      const builtScene = buildMeshFromGeometry(split.sceneGeometry);
      const builtAsset = buildMeshFromGeometry(split.assetGeometry);

      currentMesh = builtScene.object;
      sceneMesh = builtScene.object;
      worldRoot.add(builtScene.object);

      const assetRoot = addAssetToGroup(builtAsset.object, mergedMeta.assetName || "asset");

      applySceneRotation();
      fitCameraToMesh(worldRoot);

      const denoisedCount = builtScene.denoisedCount + builtAsset.denoisedCount;
      const denoiseSuffix = denoisedCount > 0 ? `, cleaned ${denoisedCount.toLocaleString()} color outliers` : "";
      setStatus(
        `Loaded ${label} (${count.toLocaleString()} vertices, mode=layered-mesh, faces=${faceCount.toLocaleString()}, rotX=${rotDeg}deg, movable=${assetRoot.userData.assetId}${denoiseSuffix})`,
      );
      return;
    }
  }

  // If this is a mesh with loose/disconnected parts, split each part into its own
  // movable root so F/G interaction works on existing scene objects too.
  if (shouldRenderAsMesh && !mergedMeta) {
    const looseParts = splitMeshIntoLooseParts(geometry);
    if (looseParts) {
      let denoisedCount = 0;
      for (const part of looseParts.parts) {
        const builtPart = buildMeshFromGeometry(part.geometry, { denoise: false });
        denoisedCount += builtPart.denoisedCount;
        addSceneObjectToGroup(builtPart.object, "scene_part");
      }
      currentMesh = null;
      sceneMesh = null;
      applySceneRotation();
      fitCameraToMesh(worldRoot);
      setStatus(
        `Loaded ${label} (${count.toLocaleString()} vertices, mode=separated-mesh, parts=${looseParts.componentCount.toLocaleString()}, faces=${faceCount.toLocaleString()}, rotX=${rotDeg}deg)`,
      );
      return;
    }
  }

  const { object, denoisedCount, denoiseLabel, renderMode } = shouldRenderAsMesh
    ? buildMeshFromGeometry(geometry)
    : buildPointCloudFromGeometry(geometry, { isSplatLike });

  currentMesh = object;
  // Standalone point-cloud scenes should be movable too.
  if (!shouldRenderAsMesh) {
    sceneMesh = null;
    addSceneObjectToGroup(object, isSplatLike ? "scene_gaussian" : "scene_points");
  } else {
    // Fallback: if mesh could not be split, still allow interacting with it as one movable object.
    sceneMesh = null;
    addSceneObjectToGroup(object, "scene_mesh");
  }
  applySceneRotation();
  fitCameraToMesh(worldRoot);
  applyPointDensityScale();

  const mode = shouldRenderAsMesh
    ? (currentHasVertexColor ? (preferCleanView ? "clean-color-movable" : "raw-color-movable") : "mesh-movable")
    : renderMode;
  const denoiseSuffix = denoisedCount > 0 ? `, cleaned ${denoisedCount.toLocaleString()} ${denoiseLabel}` : "";
  setStatus(`Loaded ${label} (${count.toLocaleString()} vertices, mode=${mode}, faces=${faceCount.toLocaleString()}, rotX=${rotDeg}deg${denoiseSuffix})`);
}

function placeAssetRootNearCamera(assetRoot) {
  if (!assetRoot) return;
  camera.getWorldDirection(tmpDropForward);
  if (tmpDropForward.lengthSq() < 1e-8) {
    tmpDropForward.set(0, 0, -1);
  } else {
    tmpDropForward.normalize();
  }
  const dropDistance = 1.4;
  const targetCenter = tmpWorldTarget.copy(camera.position).addScaledVector(tmpDropForward, dropDistance);

  assetRoot.updateMatrixWorld(true);
  const bbox = new THREE.Box3().setFromObject(assetRoot);
  if (!bbox.isEmpty()) {
    bbox.getCenter(tmpBoxCenter);
    targetCenter.sub(tmpBoxCenter.sub(assetRoot.getWorldPosition(tmpWorldPos)));
  }

  if (assetRoot.parent) {
    tmpLocalTarget.copy(targetCenter);
    assetRoot.parent.worldToLocal(tmpLocalTarget);
    assetRoot.position.copy(tmpLocalTarget);
  } else {
    assetRoot.position.copy(targetCenter);
  }
}

function addAssetFromArrayBuffer(arrayBuffer, label = "generated_asset.ply", assetType = "generated_asset") {
  const header = readPlyHeader(arrayBuffer);
  const faceCount = parseFaceCountFromHeader(header);
  const headerSplat = isNerfstudioSplatHeader(header);
  const geometry = loader.parse(arrayBuffer);

  const hasIndexFaces = Boolean(geometry.index && geometry.index.count >= 3);
  const attrNames = Object.keys(geometry.attributes ?? {});
  const attrSplat = attrNames.includes("f_dc_0") && attrNames.includes("opacity") && attrNames.includes("scale_0");
  const isSplatLike = headerSplat || attrSplat;
  const shouldRenderAsMesh = faceCount > 0 || hasIndexFaces;

  const { object } = shouldRenderAsMesh
    ? buildMeshFromGeometry(geometry)
    : buildPointCloudFromGeometry(geometry, { isSplatLike });

  const assetRoot = addAssetToGroup(object, assetType);
  applySceneRotation();
  placeAssetRootNearCamera(assetRoot);
  setSelection(assetRoot);
  setStatus(`Inserted ${label} as ${assetRoot.userData?.assetId ?? "asset"} (press F to pick, G to place).`);
  return assetRoot;
}

window.viewerApi = {
  loadSceneFromArrayBuffer: loadGeometryFromArrayBuffer,
  addAssetFromArrayBuffer,
};

async function loadDefaultModel() {
  try {
    const response = await fetch("/model.ply", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    loadGeometryFromArrayBuffer(buffer, "/model.ply");
  } catch (error) {
    setStatus("Could not load /model.ply. Use 'Open PLY' or drag/drop a file.");
    console.error(error);
  }
}

function updateMovement(dt) {
  if (!isViewerLocked()) {
    return;
  }

  camera.getWorldDirection(moveForward);
  moveForward.y = 0;
  if (moveForward.lengthSq() > 1e-8) moveForward.normalize();
  moveRight.crossVectors(moveForward, WORLD_UP).normalize();

  const inputX = Number(isPressed("KeyD")) - Number(isPressed("KeyA"));
  const inputZ = Number(isPressed("KeyW")) - Number(isPressed("KeyS"));

  const direction = new THREE.Vector3();
  direction.addScaledVector(moveRight, inputX);
  direction.addScaledVector(moveForward, inputZ);
  if (direction.lengthSq() > 0) direction.normalize();

  const sprint = isPressed("ShiftLeft") || isPressed("ShiftRight");
  const speed = baseSpeed * (sprint ? sprintMultiplier : 1.0);
  const horiz = direction.multiplyScalar(speed);

  // Flight controls: E up, C down.
  let vY = 0.0;
  if (isPressed("KeyE")) {
    vY = verticalSpeed * (sprint ? sprintMultiplier : 1.0);
  } else if (isPressed("KeyC")) {
    vY = -verticalSpeed * (sprint ? sprintMultiplier : 1.0);
  }

  // No input -> no movement (no drift).
  camera.position.x += horiz.x * dt;
  camera.position.z += horiz.z * dt;
  camera.position.y += vY * dt;
}

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const buf = await file.arrayBuffer();
    loadGeometryFromArrayBuffer(buf, file.name);
  } catch (error) {
    setStatus(`Failed to load ${file.name}`);
    console.error(error);
  }
});

window.addEventListener("dragover", (event) => {
  event.preventDefault();
});

window.addEventListener("drop", async (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".ply")) {
    setStatus("Drop a .ply file.");
    return;
  }
  try {
    const buf = await file.arrayBuffer();
    loadGeometryFromArrayBuffer(buf, file.name);
  } catch (error) {
    setStatus(`Failed to load ${file.name}`);
    console.error(error);
  }
});

window.addEventListener("keydown", (event) => {
  if (scaleDialogOpen) {
    if (event.code === "Escape") {
      event.preventDefault();
      closeScaleDialog({ relock: true });
    }
    return;
  }

  keyState.set(event.code, true);

  if (event.code === "KeyF") {
    pickUpAssetInView();
    return;
  }
  if (event.code === "KeyG") {
    placeHeldAsset();
    return;
  }
  if (event.code === "NumpadAdd" || (event.code === "Equal" && event.shiftKey) || event.key === "+") {
    event.preventDefault();
    openScaleDialog();
    return;
  }

  if (event.code === "BracketLeft") {
    pointDensityScale = Math.max(POINT_DENSITY_SCALE_MIN, pointDensityScale * 0.85);
    applyPointDensityScale();
    setStatus(`Point density: ${(pointDensityScale * 100).toFixed(0)}%`);
    return;
  }
  if (event.code === "BracketRight") {
    pointDensityScale = Math.min(POINT_DENSITY_SCALE_MAX, pointDensityScale * 1.15);
    applyPointDensityScale();
    setStatus(`Point density: ${(pointDensityScale * 100).toFixed(0)}%`);
    return;
  }

  if (event.code === "KeyT") {
    preferCleanView = !preferCleanView;
    if (!currentMesh) return;

    const hasRaw = currentMesh.geometry?.hasAttribute("color_raw") ?? false;
    const hasClean = currentMesh.geometry?.hasAttribute("color_clean") ?? false;
    if (!hasRaw || !hasClean) {
      setStatus("Clean/raw toggle is only available for mesh vertex colors.");
      return;
    }

    const raw = currentMesh.geometry.getAttribute("color_raw");
    const clean = currentMesh.geometry.getAttribute("color_clean");
    if (raw && clean) {
      currentMesh.geometry.setAttribute("color", preferCleanView ? clean : raw);
      currentMesh.geometry.attributes.color.needsUpdate = true;
    }

    setStatus(`View mode: ${preferCleanView ? "clean-color" : "raw-color"}`);
  }

});

window.addEventListener("keyup", (event) => {
  keyState.set(event.code, false);
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

enterButton.addEventListener("click", () => {
  controls.lock();
});
document.addEventListener("pointerlockchange", () => {
  if (!isViewerLocked()) {
    if (ignoreNextUnlockEndDrag) {
      ignoreNextUnlockEndDrag = false;
    } else {
      endDrag();
    }
  }
  updateOverlay();
});
document.addEventListener("pointerlockerror", () => {
  setStatus("Pointer lock failed. Click 'Click to enter' again.");
  updateOverlay();
});
controls.addEventListener("lock", updateOverlay);
controls.addEventListener("unlock", updateOverlay);

if (scaleApplyButton) {
  scaleApplyButton.addEventListener("click", () => {
    applyScaleFromDialog();
  });
}
if (scaleCancelButton) {
  scaleCancelButton.addEventListener("click", () => {
    closeScaleDialog({ relock: true });
  });
}
if (scaleInput) {
  scaleInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      applyScaleFromDialog();
      return;
    }
    if (event.code === "Escape") {
      event.preventDefault();
      closeScaleDialog({ relock: true });
    }
  });
}

updateOverlay();
setStatus("Click 'Click to enter' for FPS mode. Use F pick, G place, + scale.");

function animate(now) {
  const dt = Math.min((now - lastTime) / 1000.0, 0.1);
  lastTime = now;

  updateMovement(dt);
  updateHeldAssetPosition();
  if (selectionOutline) selectionOutline.update();
  renderer.render(scene, camera);
  renderOrientationGizmo();
  requestAnimationFrame(animate);
}

loadDefaultModel();
requestAnimationFrame(animate);
