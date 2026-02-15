import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const statusEl = document.getElementById("status");
const fileInput = document.getElementById("fileInput");
const overlay = document.getElementById("overlay");
const enterButton = document.getElementById("enterButton");

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

const controls = new PointerLockControls(camera, document.body);
const loader = new GLTFLoader();

scene.add(new THREE.HemisphereLight(0xffffff, 0x445066, 0.85));
scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

const grid = new THREE.GridHelper(20, 20, 0x3a4558, 0x252c38);
grid.position.y = -0.001;
scene.add(grid);

const FIXED_ROT_X = -Math.PI / 2;
let currentRoot = null;

const keyState = new Map();
const moveForward = new THREE.Vector3();
const moveRight = new THREE.Vector3();
const WORLD_UP = new THREE.Vector3(0, 1, 0);
let lastTime = performance.now();

const baseSpeed = 3.0;
const sprintMultiplier = 2.0;
const verticalSpeed = 2.8;

function setStatus(text) {
  statusEl.textContent = text;
}

function isPressed(code) {
  return keyState.get(code) === true;
}

function isViewerLocked() {
  const pe = document.pointerLockElement;
  return controls.isLocked || pe === document.body || pe === renderer.domElement;
}

function updateOverlay() {
  overlay.classList.toggle("hidden", isViewerLocked());
}

function disposeMaterial(material) {
  if (!material) return;
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === "object" && value.isTexture) {
      value.dispose();
    }
  }
  material.dispose();
}

function disposeCurrentRoot() {
  if (!currentRoot) return;
  currentRoot.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (Array.isArray(obj.material)) {
      obj.material.forEach(disposeMaterial);
    } else if (obj.material) {
      disposeMaterial(obj.material);
    }
  });
  scene.remove(currentRoot);
  currentRoot = null;
}

function applySceneRotation() {
  if (!currentRoot) return;
  currentRoot.rotation.set(FIXED_ROT_X, 0, 0);
  currentRoot.updateMatrixWorld(true);
}

function fitCameraToObject(object3d) {
  const box = new THREE.Box3().setFromObject(object3d);
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

function summarizeGeometry(root) {
  let meshCount = 0;
  let triCount = 0;

  root.traverse((obj) => {
    if (!obj.isMesh || !obj.geometry) return;
    meshCount += 1;

    const index = obj.geometry.index;
    const pos = obj.geometry.getAttribute("position");
    if (index?.count) {
      triCount += Math.floor(index.count / 3);
    } else if (pos?.count) {
      triCount += Math.floor(pos.count / 3);
    }
  });

  return { meshCount, triCount };
}

function configureRoot(root) {
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = false;
    obj.receiveShadow = false;
    obj.frustumCulled = false;

    if (Array.isArray(obj.material)) {
      for (const material of obj.material) {
        if (material) material.side = THREE.FrontSide;
      }
    } else if (obj.material) {
      obj.material.side = THREE.FrontSide;
    }
  });
}

function loadGLBFromArrayBuffer(arrayBuffer, label) {
  loader.parse(
    arrayBuffer,
    "",
    (gltf) => {
      const root = gltf.scene || gltf.scenes?.[0];
      if (!root) {
        setStatus(`Failed to load ${label}: no scene found.`);
        return;
      }

      configureRoot(root);
      disposeCurrentRoot();
      currentRoot = root;
      scene.add(root);
      applySceneRotation();
      fitCameraToObject(root);

      const { meshCount, triCount } = summarizeGeometry(root);
      const rotDeg = Math.round((FIXED_ROT_X * 180) / Math.PI);
      setStatus(`Loaded ${label} (${meshCount.toLocaleString()} meshes, ${triCount.toLocaleString()} triangles, rotX=${rotDeg}deg)`);
    },
    (error) => {
      console.error(error);
      setStatus(`Failed to load ${label}.`);
    },
  );
}

async function loadDefaultModel() {
  try {
    const response = await fetch("/model.glb", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    loadGLBFromArrayBuffer(buffer, "/model.glb");
  } catch (error) {
    setStatus("Could not load /model.glb. Use 'Open GLB' or drag/drop a file.");
    console.error(error);
  }
}

function updateMovement(dt) {
  if (!isViewerLocked()) return;

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

  let vY = 0;
  if (isPressed("KeyE")) {
    vY = verticalSpeed * (sprint ? sprintMultiplier : 1.0);
  } else if (isPressed("KeyC")) {
    vY = -verticalSpeed * (sprint ? sprintMultiplier : 1.0);
  }

  camera.position.x += horiz.x * dt;
  camera.position.z += horiz.z * dt;
  camera.position.y += vY * dt;
}

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const buf = await file.arrayBuffer();
    loadGLBFromArrayBuffer(buf, file.name);
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
  const name = file.name.toLowerCase();
  if (!name.endsWith(".glb")) {
    setStatus("Drop a .glb file.");
    return;
  }
  try {
    const buf = await file.arrayBuffer();
    loadGLBFromArrayBuffer(buf, file.name);
  } catch (error) {
    setStatus(`Failed to load ${file.name}`);
    console.error(error);
  }
});

window.addEventListener("keydown", (event) => {
  keyState.set(event.code, true);
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
  overlay.classList.add("hidden");
  controls.lock();
});

document.addEventListener("pointerlockchange", updateOverlay);
document.addEventListener("pointerlockerror", () => {
  setStatus("Pointer lock failed. Click 'Click to enter' again.");
  updateOverlay();
});
controls.addEventListener("lock", updateOverlay);
controls.addEventListener("unlock", updateOverlay);
updateOverlay();

function animate(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  updateMovement(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

loadDefaultModel();
requestAnimationFrame(animate);
