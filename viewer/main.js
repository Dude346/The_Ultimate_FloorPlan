import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

const overlay = document.getElementById("overlay");
const enterButton = document.getElementById("enterButton");
const statusEl = document.getElementById("status");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setClearColor(0x101418, 1.0);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 2000);

const splatViewer = new GaussianSplats3D.Viewer({
  selfDrivenMode: false,
  renderer,
  camera,
  useBuiltInControls: false,
  sphericalHarmonicsDegree: 0,
  sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
  gpuAcceleratedSort: false,
  integerBasedSort: false,
  sharedMemoryForWorkers: false,
});

const keyState = new Map();
const velocity = new THREE.Vector3();
const moveDir = new THREE.Vector3();
const lookDir = new THREE.Vector3();
const lookTarget = new THREE.Vector3();

const worldUp = new THREE.Vector3(0, 1, 0);
const forward = new THREE.Vector3();
const right = new THREE.Vector3();

let sceneLoaded = false;
let walkMode = true;
let floorY = 0;
let yaw = 0;
let pitch = 0;
let lastTime = performance.now();

const eyeHeight = 1.6;
const baseSpeed = 4.0;
const sprintMultiplier = 2.0;
const acceleration = 30.0;
const damping = 10.0;
const mouseSensitivity = 0.002;
const maxPitch = THREE.MathUtils.degToRad(85);

function isPointerLocked() {
  return document.pointerLockElement === renderer.domElement;
}

function lockPointer() {
  if (!isPointerLocked()) renderer.domElement.requestPointerLock();
}

function updateOverlay() {
  const locked = isPointerLocked();
  overlay.classList.toggle("hidden", locked);
  document.body.style.cursor = locked ? "none" : "auto";
}

function isPressed(code) {
  return keyState.get(code) === true;
}

function clampToGround() {
  camera.position.y = floorY + eyeHeight;
  velocity.y = 0;
}

function applyCameraLook() {
  const cp = Math.cos(pitch);
  lookDir.set(Math.sin(yaw) * cp, Math.sin(pitch), Math.cos(yaw) * cp).normalize();
  lookTarget.copy(camera.position).add(lookDir);
  camera.up.copy(worldUp);
  camera.lookAt(lookTarget);
}

function setLookAtTarget(target) {
  const dir = target.clone().sub(camera.position);
  if (dir.lengthSq() === 0) return;
  dir.normalize();
  pitch = THREE.MathUtils.clamp(Math.asin(dir.y), -maxPitch, maxPitch);
  yaw = Math.atan2(dir.x, dir.z);
  applyCameraLook();
}

function frameToScene() {
  const splatMesh = splatViewer.getSplatMesh?.();
  const bounds = splatMesh?.boundingBox;

  if (!bounds || bounds.isEmpty()) {
    camera.position.set(0, eyeHeight, 5);
    floorY = 0;
    setLookAtTarget(new THREE.Vector3(0, eyeHeight, 0));
    return;
  }

  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const radius = Math.max(size.length() * 0.35, 2.0);

  floorY = bounds.min.y;
  camera.position.set(center.x, floorY + eyeHeight, center.z + radius);
  setLookAtTarget(center);

  statusEl.textContent =
    `Loaded /scene_clean.ply (${(splatMesh?.getSplatCount?.() ?? 0).toLocaleString()} splats)`;
}

function updateMovement(dt) {
  if (!isPointerLocked()) {
    velocity.set(0, 0, 0);
    return;
  }

  forward.set(Math.sin(yaw), 0, Math.cos(yaw)).normalize();
  right.set(forward.z, 0, -forward.x).normalize();

  moveDir.set(0, 0, 0);
  if (isPressed("KeyW")) moveDir.add(forward);
  if (isPressed("KeyS")) moveDir.sub(forward);
  if (isPressed("KeyD")) moveDir.add(right);
  if (isPressed("KeyA")) moveDir.sub(right);

  if (!walkMode && isPressed("Space")) moveDir.y += 1;
  if (!walkMode && (isPressed("ControlLeft") || isPressed("ControlRight"))) moveDir.y -= 1;

  if (moveDir.lengthSq() > 0) moveDir.normalize();

  const sprinting = isPressed("ShiftLeft") || isPressed("ShiftRight");
  const speed = baseSpeed * (sprinting ? sprintMultiplier : 1.0);

  const desiredVelocity = moveDir.multiplyScalar(speed);
  velocity.x += (desiredVelocity.x - velocity.x) * Math.min(1.0, acceleration * dt);
  velocity.y += (desiredVelocity.y - velocity.y) * Math.min(1.0, acceleration * dt);
  velocity.z += (desiredVelocity.z - velocity.z) * Math.min(1.0, acceleration * dt);

  const drag = Math.exp(-damping * dt);
  velocity.multiplyScalar(drag);

  camera.position.addScaledVector(velocity, dt);
  if (walkMode) clampToGround();
  applyCameraLook();
}

function onMouseMove(event) {
  if (!isPointerLocked()) return;
  yaw -= event.movementX * mouseSensitivity;
  pitch -= event.movementY * mouseSensitivity;
  pitch = THREE.MathUtils.clamp(pitch, -maxPitch, maxPitch);
  applyCameraLook();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(now) {
  const dt = Math.min((now - lastTime) / 1000.0, 0.1);
  lastTime = now;

  updateMovement(dt);

  if (sceneLoaded) {
    splatViewer.update();
    splatViewer.render();
  }

  requestAnimationFrame(animate);
}

enterButton.addEventListener("click", lockPointer);
renderer.domElement.addEventListener("click", lockPointer);
document.addEventListener("pointerlockchange", updateOverlay);
document.addEventListener("mousemove", onMouseMove);
window.addEventListener("resize", onResize);

document.addEventListener("keydown", (event) => {
  keyState.set(event.code, true);

  if (event.code === "KeyV") {
    walkMode = !walkMode;
    if (walkMode) clampToGround();
    statusEl.textContent = `Loaded /scene_clean.ply (${walkMode ? "walk" : "fly"} mode)`;
  }
});

document.addEventListener("keyup", (event) => {
  keyState.set(event.code, false);
});

updateOverlay();

(async () => {
  try {
    await splatViewer.addSplatScene("/scene_clean.ply", {
      format: GaussianSplats3D.SceneFormat.Ply,
      showLoadingUI: true,
      progressiveLoad: false,
      splatAlphaRemovalThreshold: 5,
    });

    sceneLoaded = true;
    frameToScene();
  } catch (error) {
    statusEl.textContent = "Failed to load /scene_clean.ply (see console)";
    console.error("Failed to load splat scene:", error);
  }
})();

requestAnimationFrame(animate);
