import { access, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

function printUsage() {
  console.log([
    "Usage:",
    "  npm run dev:ply -- --ply /path/to/mesh.ply",
    "",
    "Optional extra Vite args:",
    "  npm run dev:ply -- --ply /path/to/mesh.ply --host --port 5174",
  ].join("\n"));
}

function parseArgs(argv) {
  let plyPath = "";
  const viteArgs = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
    if (arg === "--ply") {
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        console.error("Error: --ply requires a path value.");
        printUsage();
        process.exit(1);
      }
      plyPath = next;
      i += 1;
      continue;
    }
    viteArgs.push(arg);
  }

  if (!plyPath) {
    console.error("Error: Missing required --ply argument.");
    printUsage();
    process.exit(1);
  }

  return { plyPath, viteArgs };
}

async function main() {
  const { plyPath, viteArgs } = parseArgs(process.argv.slice(2));

  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const source = path.resolve(process.cwd(), plyPath);
  const target = path.resolve(thisDir, "public", "model.ply");
  const viteBin = path.resolve(thisDir, "node_modules", "vite", "bin", "vite.js");

  try {
    await access(source);
  } catch {
    console.error(`Error: PLY file not found: ${source}`);
    process.exit(1);
  }

  try {
    await access(viteBin);
  } catch {
    console.error("Error: Vite binary not found. Run `npm install` in viewer first.");
    process.exit(1);
  }

  await copyFile(source, target);
  console.log(`Copied PLY:\n  from ${source}\n  to   ${target}`);

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
