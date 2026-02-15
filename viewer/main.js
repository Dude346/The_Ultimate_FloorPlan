import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

const statusEl = document.getElementById("status");
const fileInput = document.getElementById("fileInput");
const overlay = document.getElementById("overlay");
const enterButton = document.getElementById("enterButton");

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
scene.background = new THREE.Color(0x0e1116);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 5000);
camera.position.set(0, 1.5, 3);

const viewportSize = new THREE.Vector2();

const controls = new PointerLockControls(camera, document.body);

scene.add(new THREE.HemisphereLight(0xffffff, 0x445066, 0.85));
scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

const grid = new THREE.GridHelper(20, 20, 0x3a4558, 0x252c38);
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

// Top-right orientation widget (XYZ + coordinate planes).
const gizmoScene = new THREE.Scene();
const gizmoCamera = new THREE.PerspectiveCamera(40, 1, 0.01, 50);
gizmoCamera.position.set(0, 0, 5);
gizmoCamera.lookAt(0, 0, 0);

const gizmoRoot = new THREE.Group();
gizmoScene.add(gizmoRoot);

const gizmoLight = new THREE.AmbientLight(0xffffff, 0.9);
gizmoScene.add(gizmoLight);
const gizmoBg = new THREE.Mesh(
  new THREE.PlaneGeometry(3.4, 3.4),
  new THREE.MeshBasicMaterial({ color: 0x0a0e14, transparent: true, opacity: 0.62, depthWrite: false }),
);
gizmoBg.position.z = -1.0;
gizmoScene.add(gizmoBg);

const axisLen = 1.2;
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), axisLen, 0xff5a5a, 0.34, 0.2));
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), axisLen, 0x66e26f, 0.34, 0.2));
gizmoRoot.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), axisLen, 0x4f95ff, 0.34, 0.2));

const planeMaterialXY = new THREE.MeshBasicMaterial({ color: 0x5b72ff, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false });
const planeMaterialXZ = new THREE.MeshBasicMaterial({ color: 0x50d07c, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false });
const planeMaterialYZ = new THREE.MeshBasicMaterial({ color: 0xff8b73, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false });

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
  ctx.fillStyle = "rgba(8,12,18,0.85)";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = fillColor;
  ctx.stroke();
  ctx.font = "bold 44px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = fillColor;
  ctx.fillText(text, size / 2, size / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false }),
  );
  sprite.scale.set(0.42, 0.42, 1);
  return sprite;
}

const labelX = createAxisLabel("X", "#ff7a7a");
labelX.position.set(1.45, 0, 0);
gizmoRoot.add(labelX);
const labelY = createAxisLabel("Y", "#85ef88");
labelY.position.set(0, 1.45, 0);
gizmoRoot.add(labelY);
const labelZ = createAxisLabel("Z", "#7db1ff");
labelZ.position.set(0, 0, 1.45);
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
const MAX_PICK_DISTANCE = 8.0;
const DROP_DISTANCE = 0.3; // place slightly in front of the camera, in full 3D space

let selected = null;
let heldAsset = null;
let heldCenterOffsetX = 0;
let heldCenterOffsetZ = 0;
let heldCenterOffsetY = 0;
let selectionOutline = null;
let orbitWasEnabled = null;

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

function getAssetRootFromObject(hitObject) {
  let node = hitObject;
  while (node && node.parent && node.parent !== assetsGroup) {
    node = node.parent;
  }
  if (!node || node.parent !== assetsGroup) return null;
  return node.userData?.movable ? node : null;
}

function pickAssetFromViewCenter() {
  raycaster.setFromCamera(centerNDC, camera);
  const hits = raycaster.intersectObjects(assetsGroup.children, true);
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

function updateHeldAssetPosition() {
  // Held assets are hidden while carried, so no per-frame movement is required.
}

function renderOrientationGizmo() {
  renderer.getSize(viewportSize);
  const width = viewportSize.x;
  const height = viewportSize.y;
  const size = Math.round(Math.min(width, height) * 0.19);
  const margin = 12;
  const x = width - size - margin;
  const y = height - size - margin;

  gizmoRoot.quaternion.copy(camera.quaternion).invert();

  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setViewport(x, y, size, size);
  renderer.setScissor(x, y, size, size);
  renderer.render(gizmoScene, gizmoCamera);
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, width, height);
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
    setStatus("No movable asset in range. Aim at an asset and press F.");
    return;
  }

  setSelection(picked);
  heldAsset = selected;
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
  return THREE.MathUtils.clamp(base * multiplier, 0.001, 0.12);
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

function buildMeshFromGeometry(geometry) {
  recomputeAndSanitizeNormals(geometry);
  geometry.computeBoundingBox();

  const { hasColor, cleanedCount } = prepareColorModes(geometry);
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

  const { object, denoisedCount, denoiseLabel, renderMode } = shouldRenderAsMesh
    ? buildMeshFromGeometry(geometry)
    : buildPointCloudFromGeometry(geometry, { isSplatLike });

  currentMesh = object;
  sceneMesh = object;
  worldRoot.add(object);
  applySceneRotation();
  fitCameraToMesh(worldRoot);
  applyPointDensityScale();

  const mode = shouldRenderAsMesh && currentHasVertexColor ? (preferCleanView ? "clean-color" : "raw-color") : renderMode;
  const denoiseSuffix = denoisedCount > 0 ? `, cleaned ${denoisedCount.toLocaleString()} ${denoiseLabel}` : "";
  setStatus(`Loaded ${label} (${count.toLocaleString()} vertices, mode=${mode}, faces=${faceCount.toLocaleString()}, rotX=${rotDeg}deg${denoiseSuffix})`);
}

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
  keyState.set(event.code, true);

  if (event.code === "KeyF") {
    pickUpAssetInView();
    return;
  }
  if (event.code === "KeyG") {
    placeHeldAsset();
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
    endDrag();
  }
  updateOverlay();
});
document.addEventListener("pointerlockerror", () => {
  setStatus("Pointer lock failed. Click 'Click to enter' again.");
  updateOverlay();
});
controls.addEventListener("lock", updateOverlay);
controls.addEventListener("unlock", updateOverlay);
updateOverlay();
setStatus("Click 'Click to enter' for FPS mode. Use F to pick and G to place.");

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
