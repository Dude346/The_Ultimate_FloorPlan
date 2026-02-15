import { access, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

function printUsage() {
  console.log([
    "Usage:",
    "  npm run dev:glb -- --glb /path/to/model.glb",
    "",
    "Optional extra Vite args:",
    "  npm run dev:glb -- --glb /path/to/model.glb --host --port 5174",
  ].join("\n"));
}

function parseArgs(argv) {
  let glbPath = "";
  const viteArgs = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
    if (arg === "--glb") {
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        console.error("Error: --glb requires a path value.");
        printUsage();
        process.exit(1);
      }
      glbPath = next;
      i += 1;
      continue;
    }
    viteArgs.push(arg);
  }

  if (!glbPath) {
    console.error("Error: Missing required --glb argument.");
    printUsage();
    process.exit(1);
  }

  return { glbPath, viteArgs };
}

async function main() {
  const { glbPath, viteArgs } = parseArgs(process.argv.slice(2));

  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const source = path.resolve(process.cwd(), glbPath);
  const target = path.resolve(thisDir, "public", "model.glb");
  const viteBin = path.resolve(thisDir, "node_modules", "vite", "bin", "vite.js");

  try {
    await access(source);
  } catch {
    console.error(`Error: GLB file not found: ${source}`);
    process.exit(1);
  }

  try {
    await access(viteBin);
  } catch {
    console.error("Error: Vite binary not found. Run `npm install` in viewer first.");
    process.exit(1);
  }

  await copyFile(source, target);
  console.log(`Copied GLB:\n  from ${source}\n  to   ${target}`);
  console.log("Open http://localhost:5173/index_glb.html (or your configured host/port).");

  const child = spawn(process.execPath, [viteBin, ...viteArgs], {
    stdio: "inherit",
    cwd: thisDir,
  });

  child.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((error) => {
  console.error("Failed to start viewer:", error);
  process.exit(1);
});
