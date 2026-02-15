import "../../viewer/styles.css";
import "./styles.css";
import "../../viewer/main.js";

const DB_NAME = "floorplan-local-scenes";
const DB_VERSION = 1;
const STORE_NAME = "scenes";

const apiBaseInput = document.getElementById("apiBase");
const appShell = document.querySelector(".app-shell");
const busyOverlay = document.getElementById("busyOverlay");
const busyText = document.getElementById("busyText");
const controlPanel = document.getElementById("controlPanel");
const sidebarToggleButton = document.getElementById("sidebarToggleButton");
const sidebarScrim = document.getElementById("sidebarScrim");
const sceneUploadInput = document.getElementById("sceneUploadInput");
const savedScenesSelect = document.getElementById("savedScenesSelect");
const loadSavedSceneButton = document.getElementById("loadSavedSceneButton");
const promptInput = document.getElementById("promptInput");
const generateAssetButton = document.getElementById("generateAssetButton");
const frontendStatus = document.getElementById("frontendStatus");
let busyCount = 0;
let pendingUploadedFile = null;
const loadButtonDefaultText = loadSavedSceneButton?.textContent || "Load";

function lockViewerPointer() {
  if (document.pointerLockElement) return;
  document.body.requestPointerLock?.();
}

function setSidebarOpen(open, { relockViewer = true } = {}) {
  if (!appShell || !controlPanel) return;
  appShell.classList.toggle("sidebar-open", open);
  controlPanel.classList.toggle("is-open", open);
  if (open && document.pointerLockElement) {
    document.exitPointerLock();
  } else if (!open && relockViewer) {
    lockViewerPointer();
  }
}

function isTypingInField() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active.isContentEditable;
}

function setFrontendStatus(text) {
  frontendStatus.textContent = text;
}

function setBusy(message, isBusy) {
  if (!busyOverlay) return;
  if (isBusy) {
    busyCount += 1;
    if (busyText && message) busyText.textContent = message;
    busyOverlay.classList.remove("hidden");
    return;
  }
  busyCount = Math.max(0, busyCount - 1);
  if (busyCount === 0) {
    busyOverlay.classList.add("hidden");
  }
}

async function withBusy(message, run) {
  setBusy(message, true);
  await new Promise((resolve) => requestAnimationFrame(resolve));
  try {
    return await run();
  } finally {
    setBusy("", false);
  }
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function listScenes() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const scenes = (request.result || []).sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(scenes);
    };
    request.onerror = () => reject(request.error);
  });
}

async function saveSceneFile(file) {
  const id = `${Date.now()}-${file.name}`;
  const bytes = await file.arrayBuffer();
  const payload = {
    id,
    name: file.name,
    bytes,
    updatedAt: Date.now(),
  };
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(payload);
    tx.oncomplete = () => resolve(payload);
    tx.onerror = () => reject(tx.error);
  });
}

async function getSceneById(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function refreshSavedSceneList() {
  const scenes = await listScenes();
  savedScenesSelect.innerHTML = "";
  const truncate = (value, max = 28) => (value.length > max ? `${value.slice(0, max - 1)}...` : value);
  for (const scene of scenes) {
    const option = document.createElement("option");
    option.value = scene.id;
    option.textContent = `${truncate(scene.name)} (${new Date(scene.updatedAt).toLocaleString()})`;
    savedScenesSelect.appendChild(option);
  }
}

function getViewerApi() {
  const api = window.viewerApi;
  if (!api) throw new Error("Viewer is still loading.");
  return api;
}

async function loadSceneRecord(sceneRecord) {
  const api = getViewerApi();
  api.loadSceneFromArrayBuffer(sceneRecord.bytes, sceneRecord.name);
}

function setLoadButtonBusy(isBusy) {
  if (!loadSavedSceneButton) return;
  loadSavedSceneButton.classList.toggle("is-loading", isBusy);
  loadSavedSceneButton.disabled = isBusy;
  loadSavedSceneButton.innerHTML = isBusy ? '<span class="btn-spinner" aria-hidden="true"></span>' : loadButtonDefaultText;
}

function setDesignBusy(isBusy) {
  promptInput.readOnly = isBusy;
  generateAssetButton.disabled = isBusy;
  generateAssetButton.classList.toggle("is-loading", isBusy);
  generateAssetButton.innerHTML = isBusy ? '<span class="btn-spinner white" aria-hidden="true"></span>' : "Generate and insert";
}

sceneUploadInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  pendingUploadedFile = file;
});

loadSavedSceneButton.addEventListener("click", async () => {
  setLoadButtonBusy(true);
  try {
    if (pendingUploadedFile) {
      await withBusy("Loading PLY...", async () => {
        const saved = await saveSceneFile(pendingUploadedFile);
        await refreshSavedSceneList();
        savedScenesSelect.value = saved.id;
        await loadSceneRecord(saved);
      });
      pendingUploadedFile = null;
      sceneUploadInput.value = "";
      return;
    }

    const id = savedScenesSelect.value;
    if (!id) {
      return;
    }
    await withBusy("Loading PLY...", async () => {
      const record = await getSceneById(id);
      if (!record) {
        return;
      }
      await loadSceneRecord(record);
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoadButtonBusy(false);
  }
});

generateAssetButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    setFrontendStatus("Enter a prompt first");
    return;
  }

  const base = (apiBaseInput.value || "http://localhost:8000").replace(/\/+$/, "");
  setDesignBusy(true);
  try {
    setFrontendStatus("Generating asset...");
    await withBusy("Generating and combining asset...", async () => {
      const response = await fetch(`${base}/generate-ply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const api = getViewerApi();
      api.addAssetFromArrayBuffer(arrayBuffer, `${prompt}.ply`, "generated");
    });
    setFrontendStatus("Asset generated and inserted...");
  } catch (error) {
    console.error(error);
    setFrontendStatus("Generation failed check backend and Modal auth...");
  } finally {
    setDesignBusy(false);
  }
});

sidebarToggleButton?.addEventListener("click", () => {
  const open = !controlPanel?.classList.contains("is-open");
  setSidebarOpen(open);
});

sidebarScrim?.addEventListener("click", () => {
  setSidebarOpen(false);
});

window.addEventListener("keydown", (event) => {
  if (isTypingInField()) return;
  if (event.code === "Space") {
    event.preventDefault();
    const open = !controlPanel?.classList.contains("is-open");
    setSidebarOpen(open);
    return;
  }
  if (event.key === "Escape") {
    setSidebarOpen(false);
  }
});

await refreshSavedSceneList();
setSidebarOpen(false, { relockViewer: false });
setFrontendStatus("Upload a room PLY to get started");
