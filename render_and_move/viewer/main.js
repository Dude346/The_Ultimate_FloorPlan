import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

const overlay = document.getElementById("overlay");
const enterButton = document.getElementById("enterButton");
const statusEl = document.getElementById("status");

// ---------------- Renderer ----------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setClearColor(0x101418, 1);
document.body.appendChild(renderer.domElement);

// ---------------- Camera ----------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  2000,
);

// ---------------- Controls State ----------------
const keyState = new Map();
const velocity = new THREE.Vector3();
const moveDir = new THREE.Vector3();
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const up = new THREE.Vector3();
const WORLD_Y_UP = new THREE.Vector3(0, 1, 0);
const baseForward = new THREE.Vector3(0, 0, -1);

const lookDir = new THREE.Vector3();
const lookTarget = new THREE.Vector3();
const yawQuat = new THREE.Quaternion();
const pitchQuat = new THREE.Quaternion();
const rightAxis = new THREE.Vector3();

// Dynamic "walk up" axis and floor plane along that axis
const WALK_UP = new THREE.Vector3(0, -1, 0);
let floorH = 0.0; // dot(pos, WALK_UP) of the floor plane (lowest along WALK_UP)

// Temps for bbox corner sampling
const tmpCorner = new THREE.Vector3();
const tmpWorldBox = new THREE.Box3();
const tmpWorldCenter = new THREE.Vector3();
const tmpMatrix = new THREE.Matrix4();
const tmpNdc = new THREE.Vector2();
const tmpRaycaster = new THREE.Raycaster();
const tmpFloorPlane = new THREE.Plane();
const tmpFloorPoint = new THREE.Vector3();
const tmpLookForward = new THREE.Vector3();

const BUILD_TAG = "controls-v12-profiles";

// Movement tuning
const baseSpeed = 4.0;
const sprintMultiplier = 2.2;
const acceleration = 30.0;
const damping = 10.0;
const eyeHeight = 1.6;

const START_AT_SCENE_CENTER = true;
let walkMode = true;

// Look tuning
const lookSensitivity = 0.002;
const maxPitchUp = THREE.MathUtils.degToRad(89);
const maxPitchDown = THREE.MathUtils.degToRad(89);
const HEAD_YAW_OFFSET = Math.PI; // 180-degree turn

let yaw = 0;
let pitch = 0;

// ---------------- Gaussian Splat Viewer ----------------
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

let splatLoaded = false;
let lastTime = performance.now();

// Orientation presets (start at Identity by default)
const ORIENTATION_PRESETS = [
  { label: "Identity", quat: new THREE.Quaternion() },
  { label: "X +90", quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)) },
  { label: "X -90", quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)) },
];
let orientationPresetIndex = 0;
const VIEW_KEY_TO_INDEX = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  Digit4: 3,
  Digit5: 4,
  Digit6: 5,
  Digit7: 6,
  Digit8: 7,
  Digit9: 8,
  Digit0: 0,
};
const PROFILE_KEY_TO_INDEX = {
  F1: 0,
  F2: 1,
  F3: 2,
  F4: 3,
  F5: 4,
  F6: 5,
  F7: 6,
  F8: 7,
  F9: 8,
  F10: 9,
};
let viewPresets = [];
let activeViewIndex = 0;
const CONTROL_PROFILES = [
  {
    name: "P0 Z+/X- yawY",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P1 Z-/X+ yawY",
    forward: new THREE.Vector3(0, 0, -1),
    right: new THREE.Vector3(1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P2 X+/Z+ yawY",
    forward: new THREE.Vector3(1, 0, 0),
    right: new THREE.Vector3(0, 0, 1),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P3 X-/Z- yawY",
    forward: new THREE.Vector3(-1, 0, 0),
    right: new THREE.Vector3(0, 0, -1),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P4 Z+/X- yawY invertX",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: 1,
    pitchSign: -1,
  },
  {
    name: "P5 Z+/X- yawY invertY",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: 1,
  },
  {
    name: "P6 Z+/X- swapMouse",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: true,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P7 Z+/X- yawZ",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(0, 0, 1),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P8 Z+/X- yawX",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(-1, 0, 0),
    yawAxis: new THREE.Vector3(1, 0, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
  {
    name: "P9 Z+/X+ yawY",
    forward: new THREE.Vector3(0, 0, 1),
    right: new THREE.Vector3(1, 0, 0),
    yawAxis: new THREE.Vector3(0, 1, 0),
    swapMouse: false,
    yawSign: -1,
    pitchSign: -1,
  },
];
let activeControlProfileIndex = 0;

// ---------------- Utilities ----------------
function isPointerLocked() {
  return document.pointerLockElement === renderer.domElement;
}

function lockPointer() {
  if (!isPointerLocked()) renderer.domElement.requestPointerLock();
}

function forceUnlockPointer() {
  if (document.pointerLockElement) document.exitPointerLock();
  updateOverlayVisibility();
}

function updateOverlayVisibility() {
  const locked = isPointerLocked();
  overlay.classList.toggle("hidden", locked);
  if (locked) {
    document.body.style.setProperty("cursor", "none", "important");
    renderer.domElement.style.setProperty("cursor", "none", "important");
    overlay.style.setProperty("cursor", "none", "important");
  } else {
    // Hard override so cursor is always visible after Esc/unlock.
    document.body.style.setProperty("cursor", "auto", "important");
    renderer.domElement.style.setProperty("cursor", "crosshair", "important");
    overlay.style.setProperty("cursor", "auto", "important");
  }
}

function isPressed(code) {
  return keyState.get(code) === true;
}

/**
 * Update WALK_UP based on the splat scene orientation.
 * Important: force WALK_UP to point "up-ish" in world space so we don't end up on the ceiling.
 */
function updateWalkUpFromScene() {
  // Force standard FPS world-up controls regardless of scene orientation.
  WALK_UP.copy(WORLD_Y_UP);
}

/**
 * Convert local splat bounds to world-space AABB.
 */
function computeWorldBoundsFromLocal(bounds) {
  const scene0 = splatViewer.getSplatScene?.(0);
  if (!bounds || bounds.isEmpty()) return null;

  tmpMatrix.identity();
  if (scene0) {
    scene0.updateMatrixWorld?.(true);
    tmpMatrix.copy(scene0.matrixWorld);
  }

  const xs = [bounds.min.x, bounds.max.x];
  const ys = [bounds.min.y, bounds.max.y];
  const zs = [bounds.min.z, bounds.max.z];

  tmpWorldBox.makeEmpty();
  for (const x of xs) for (const y of ys) for (const z of zs) {
    tmpCorner.set(x, y, z).applyMatrix4(tmpMatrix);
    tmpWorldBox.expandByPoint(tmpCorner);
  }
  return tmpWorldBox.clone();
}

/**
 * Clamp camera to walk plane: dot(pos, WALK_UP) = floorH + eyeHeight
 */
function clampToWalkPlane() {
  const desired = floorH + eyeHeight;
  const current = camera.position.dot(WALK_UP);
  camera.position.addScaledVector(WALK_UP, desired - current);
}

/**
 * Apply yaw/pitch to camera.
 * yaw is around WALK_UP; pitch is around right axis derived from yaw-forward.
 */
function applyCameraLook() {
  const profile = CONTROL_PROFILES[activeControlProfileIndex];
  const yawAxis = profile.yawAxis;
  camera.up.copy(yawAxis);

  const effectiveYaw = yaw + HEAD_YAW_OFFSET;
  yawQuat.setFromAxisAngle(yawAxis, effectiveYaw);
  lookDir.copy(baseForward).applyQuaternion(yawQuat).normalize();

  rightAxis.copy(lookDir).cross(yawAxis).normalize();
  pitchQuat.setFromAxisAngle(rightAxis, pitch);
  lookDir.applyQuaternion(pitchQuat).normalize();

  lookTarget.copy(camera.position).add(lookDir);
  camera.lookAt(lookTarget);
}

/**
 * Set yaw/pitch from a world-space target and apply.
 */
function applyLookAtTarget(target) {
  const dir = target.clone().sub(camera.position);
  if (dir.lengthSq() === 0) return;
  dir.normalize();

  // Vertical component along WALK_UP controls pitch
  const vertical = THREE.MathUtils.clamp(dir.dot(WALK_UP), -1, 1);
  pitch = THREE.MathUtils.clamp(Math.asin(vertical), -maxPitchUp, maxPitchDown);

  // Yaw from planar projection against planar forward basis
  const planarDir = dir.clone().addScaledVector(WALK_UP, -vertical);
  if (planarDir.lengthSq() > 1e-8) {
    planarDir.normalize();
    const planarFwd = baseForward.clone().addScaledVector(WALK_UP, -baseForward.dot(WALK_UP));
    if (planarFwd.lengthSq() > 1e-8) {
      planarFwd.normalize();
      const planarRight = WALK_UP.clone().cross(planarFwd).normalize();
      yaw = Math.atan2(planarDir.dot(planarRight), planarDir.dot(planarFwd));
    }
  }

  applyCameraLook();
}

function onMouseMove(event) {
  if (!isPointerLocked()) return;
  const profile = CONTROL_PROFILES[activeControlProfileIndex];

  if (profile.swapMouse) {
    yaw += event.movementY * lookSensitivity * profile.yawSign;
    pitch += event.movementX * lookSensitivity * profile.pitchSign;
  } else {
    yaw += event.movementX * lookSensitivity * profile.yawSign;
    pitch += event.movementY * lookSensitivity * profile.pitchSign;
  }
  pitch = THREE.MathUtils.clamp(pitch, -maxPitchUp, maxPitchDown);

  applyCameraLook();
}

function getEyePlaneCenter(center) {
  const out = center.clone();
  const desired = floorH + eyeHeight;
  const current = out.dot(WALK_UP);
  out.addScaledVector(WALK_UP, desired - current);
  return out;
}

function buildViewPresets(center, radius) {
  const near = Math.max(radius * 0.35, 4);
  const far = Math.max(radius * 0.7, 8);

  let planarFwd = baseForward.clone().addScaledVector(WALK_UP, -baseForward.dot(WALK_UP));
  if (planarFwd.lengthSq() < 1e-8) planarFwd = new THREE.Vector3(1, 0, 0);
  planarFwd.normalize();
  const planarRight = WALK_UP.clone().cross(planarFwd).normalize();

  const eyeCenter = getEyePlaneCenter(center);
  const target = center.clone();

  return [
    { name: "Center", pos: eyeCenter.clone(), target: center.clone().add(planarFwd) },
    { name: "Front", pos: eyeCenter.clone().addScaledVector(planarFwd, near), target },
    { name: "Back", pos: eyeCenter.clone().addScaledVector(planarFwd, -near), target },
    { name: "Right", pos: eyeCenter.clone().addScaledVector(planarRight, near), target },
    { name: "Left", pos: eyeCenter.clone().addScaledVector(planarRight, -near), target },
    {
      name: "Front Right",
      pos: eyeCenter.clone().addScaledVector(planarFwd, near).addScaledVector(planarRight, near),
      target,
    },
    {
      name: "Front Left",
      pos: eyeCenter.clone().addScaledVector(planarFwd, near).addScaledVector(planarRight, -near),
      target,
    },
    {
      name: "Back Right",
      pos: eyeCenter.clone().addScaledVector(planarFwd, -near).addScaledVector(planarRight, near),
      target,
    },
    {
      name: "Back Left",
      pos: eyeCenter.clone().addScaledVector(planarFwd, -near).addScaledVector(planarRight, -near),
      target,
    },
    {
      name: "High Overview",
      pos: eyeCenter.clone().addScaledVector(WALK_UP, Math.max(radius * 0.45, 6)).addScaledVector(planarFwd, far * 0.3),
      target,
    },
  ];
}

function updateStatus(extra = "") {
  const splatCount = splatViewer.getSplatMesh?.()?.getSplatCount?.() ?? 0;
  const viewName = viewPresets[activeViewIndex]?.name ?? "N/A";
  const profileName = CONTROL_PROFILES[activeControlProfileIndex]?.name ?? "N/A";
  statusEl.textContent =
    `Loaded /scene.ply (${splatCount.toLocaleString()} splats, ` +
    `orientation=${ORIENTATION_PRESETS[orientationPresetIndex].label}, ` +
    `mode=${walkMode ? "walk" : "fly"}, view=${activeViewIndex + 1}:${viewName}, ` +
    `profile=${activeControlProfileIndex}:${profileName}, ${BUILD_TAG}` +
    (extra ? `, ${extra}` : "") +
    ")";
}

function applyViewPreset(index) {
  const preset = viewPresets[index];
  if (!preset) return;
  activeViewIndex = index;
  camera.position.copy(preset.pos);
  if (walkMode) clampToWalkPlane();
  applyLookAtTarget(preset.target);
}

function teleportToFloorFromScreen(clientX, clientY) {
  if (!splatLoaded) return false;

  tmpNdc.x = (clientX / window.innerWidth) * 2 - 1;
  tmpNdc.y = -(clientY / window.innerHeight) * 2 + 1;

  tmpRaycaster.setFromCamera(tmpNdc, camera);
  tmpFloorPlane.set(WALK_UP.x, WALK_UP.y, WALK_UP.z, -floorH);
  if (!tmpRaycaster.ray.intersectPlane(tmpFloorPlane, tmpFloorPoint)) return false;

  camera.position.copy(tmpFloorPoint).addScaledVector(WALK_UP, eyeHeight);
  velocity.set(0, 0, 0);
  applyCameraLook();
  if (walkMode) clampToWalkPlane();
  return true;
}

function saveCurrentAsViewZero() {
  if (!viewPresets[0]) return;
  camera.getWorldDirection(tmpLookForward).normalize();
  viewPresets[0] = {
    ...viewPresets[0],
    name: "Center (manual)",
    pos: camera.position.clone(),
    target: camera.position.clone().add(tmpLookForward),
  };
  activeViewIndex = 0;
}

/**
 * Compute movement from yaw only on the walk plane.
 * We remove any component along WALK_UP to ensure horizontal movement.
 */
function getMoveInputVector() {
  moveDir.set(0, 0, 0);
  const profile = CONTROL_PROFILES[activeControlProfileIndex];

  // Force movement to fixed world axes:
  // W/S -> world Z axis, A/D -> world X axis.
  forward.copy(profile.forward);
  right.copy(profile.right);
  up.copy(WALK_UP);

  if (isPressed("KeyW")) moveDir.add(forward);
  if (isPressed("KeyS")) moveDir.sub(forward);
  if (isPressed("KeyD")) moveDir.add(right);
  if (isPressed("KeyA")) moveDir.sub(right);

  if (!walkMode && isPressed("Space")) moveDir.add(up);
  if (!walkMode && (isPressed("ControlLeft") || isPressed("ControlRight"))) moveDir.sub(up);

  if (moveDir.lengthSq() > 0) moveDir.normalize();
  return moveDir;
}

function updateMovement(dt) {
  if (!isPointerLocked()) {
    velocity.set(0, 0, 0);
    if (walkMode) clampToWalkPlane();
    return;
  }

  const sprinting = isPressed("ShiftLeft") || isPressed("ShiftRight");
  const moveSpeed = baseSpeed * (sprinting ? sprintMultiplier : 1.0);

  const inputDir = getMoveInputVector();
  const desiredVelocity = inputDir.clone().multiplyScalar(moveSpeed);

  // accelerate toward desired
  const dv = desiredVelocity.sub(velocity);
  const maxDelta = acceleration * dt;
  if (dv.length() > maxDelta) dv.setLength(maxDelta);
  velocity.add(dv);

  // damping
  const drag = Math.exp(-damping * dt);
  velocity.multiplyScalar(drag);

  camera.position.addScaledVector(velocity, dt);
  if (walkMode) clampToWalkPlane();

  applyCameraLook();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ---------------- Scene orientation ----------------
function applySceneOrientation() {
  const scene0 = splatViewer.getSplatScene?.(0);
  if (!scene0) return;

  scene0.quaternion.copy(ORIENTATION_PRESETS[orientationPresetIndex].quat);

  // IMPORTANT: update walk-up after changing orientation
  updateWalkUpFromScene();
}

/**
 * Frame camera and compute floor plane correctly for the current orientation.
 */
function frameCameraToLoadedScene() {
  const splatMesh = splatViewer.getSplatMesh?.();
  const bounds = splatMesh?.boundingBox;

  const localCenter = new THREE.Vector3();
  if (splatMesh?.calculatedSceneCenter) {
    localCenter.copy(splatMesh.calculatedSceneCenter);
  } else if (bounds && !bounds.isEmpty()) {
    bounds.getCenter(localCenter);
  } else {
    localCenter.set(0, 0, 0);
  }

  // Ensure WALK_UP matches orientation and points "up-ish"
  updateWalkUpFromScene();

  // Compute world-space center and floor from transformed bounds.
  const scene0 = splatViewer.getSplatScene?.(0);
  tmpMatrix.identity();
  if (scene0) {
    scene0.updateMatrixWorld?.(true);
    tmpMatrix.copy(scene0.matrixWorld);
  }
  const worldCenter = localCenter.clone().applyMatrix4(tmpMatrix);
  const worldBounds = computeWorldBoundsFromLocal(bounds);
  if (worldBounds && !worldBounds.isEmpty()) {
    worldBounds.getCenter(tmpWorldCenter);
    worldCenter.copy(tmpWorldCenter);
    floorH = worldBounds.min.y;
  } else {
    floorH = worldCenter.y;
  }

  // Spawn at center-of-floor in world space.
  worldCenter.y = floorH + eyeHeight;

  const radius =
    worldBounds && !worldBounds.isEmpty()
      ? Math.max(worldBounds.getSize(new THREE.Vector3()).length() * 0.5, 10)
      : 10;
  viewPresets = buildViewPresets(worldCenter, radius);
  applyViewPreset(START_AT_SCENE_CENTER ? 0 : 1);
}

// ---------------- Animation loop ----------------
function animate(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  updateOverlayVisibility();
  updateMovement(dt);

  if (splatLoaded) {
    splatViewer.update();
    splatViewer.render();
  }

  requestAnimationFrame(animate);
}

// ---------------- Events ----------------
enterButton.addEventListener("click", (event) => {
  if (event.shiftKey) return;
  lockPointer();
});
renderer.domElement.addEventListener("click", (event) => {
  // Shift+click is reserved for manual floor pick while unlocked.
  if (event.shiftKey && !isPointerLocked()) return;
  lockPointer();
});
document.addEventListener(
  "mousedown",
  (event) => {
    // Manual floor pick: unlock pointer, hold Shift, click desired floor location.
    if (event.button !== 0 || !event.shiftKey || isPointerLocked()) return;
    if (teleportToFloorFromScreen(event.clientX, event.clientY)) {
      updateStatus("Shift+Click floor pick applied");
      event.preventDefault();
      event.stopPropagation();
    }
  },
  true,
);
document.addEventListener("pointerlockchange", updateOverlayVisibility);
document.addEventListener("pointerlockerror", updateOverlayVisibility);
document.addEventListener("mousemove", onMouseMove);

document.addEventListener("keydown", (event) => {
  keyState.set(event.code, true);

  if (splatLoaded && Object.hasOwn(VIEW_KEY_TO_INDEX, event.code)) {
    applyViewPreset(VIEW_KEY_TO_INDEX[event.code]);
    updateStatus("1-9/0=view, F1-F10=profile");
  }

  if (splatLoaded && Object.hasOwn(PROFILE_KEY_TO_INDEX, event.code)) {
    activeControlProfileIndex = PROFILE_KEY_TO_INDEX[event.code];
    velocity.set(0, 0, 0);
    applyCameraLook();
    updateStatus("1-9/0=view, F1-F10=profile");
  }

  if (event.code === "KeyP" && splatLoaded) {
    activeControlProfileIndex = (activeControlProfileIndex + 1) % CONTROL_PROFILES.length;
    velocity.set(0, 0, 0);
    applyCameraLook();
    updateStatus("1-9/0=view, F1-F10=profile");
  }

  if (event.code === "KeyM" && splatLoaded) {
    saveCurrentAsViewZero();
    updateStatus("Saved current spot to view 0");
  }

  // Emergency unlock/recover cursor if browser pointer-lock state gets stuck.
  if (event.code === "KeyU") {
    forceUnlockPointer();
    updateStatus("Unlocked pointer (U)");
  }

  // Toggle walk/fly
  if (event.code === "KeyV") {
    walkMode = !walkMode;
    velocity.set(0, 0, 0);
    if (walkMode) clampToWalkPlane();
    updateStatus("1-9/0=view, F1-F10=profile");
  }

  // Cycle orientation presets
  if (event.code === "KeyZ" && splatLoaded) {
    orientationPresetIndex = (orientationPresetIndex + 1) % ORIENTATION_PRESETS.length;
    applySceneOrientation();
    frameCameraToLoadedScene();
    updateStatus("1-9/0=view, F1-F10=profile");
  }
});

document.addEventListener("keyup", (event) => {
  keyState.set(event.code, false);
  if (event.code === "Escape") {
    // Ensure UI/cursor recover immediately after unlock.
    setTimeout(updateOverlayVisibility, 0);
  }
});

window.addEventListener("resize", onResize);

updateOverlayVisibility();

// ---------------- Load splat scene ----------------
(async () => {
  try {
    await splatViewer.addSplatScene("/scene.ply", {
      format: GaussianSplats3D.SceneFormat.Ply,
      showLoadingUI: true,
      progressiveLoad: false,
      splatAlphaRemovalThreshold: 5,
    });

    // Apply default orientation and update WALK_UP
    applySceneOrientation();
    frameCameraToLoadedScene();

    splatLoaded = true;
    updateStatus(
      "1-9/0=view, F1-F10=profile, Z=orientation, V=walk/fly, P=next-profile, Shift+Click=floor pick, M=save view0",
    );
  } catch (error) {
    statusEl.textContent = "Failed to load /scene.ply (see console)";
    console.error("Failed to load Gaussian splat scene:", error);
  }
})();

requestAnimationFrame(animate);
