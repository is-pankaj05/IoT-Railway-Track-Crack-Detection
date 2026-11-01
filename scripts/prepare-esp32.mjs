import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const buildDirectory = join(projectRoot, "dist");
const filesystemDirectory = join(
  projectRoot,
  "esp32",
  "railway_safety",
  "data",
);

await rm(filesystemDirectory, { recursive: true, force: true });
await mkdir(filesystemDirectory, { recursive: true });

for (const entry of await readdir(buildDirectory)) {
  await cp(
    join(buildDirectory, entry),
    join(filesystemDirectory, entry),
    { recursive: true, force: true },
  );
}

console.log(`ESP32 LittleFS web files prepared in ${filesystemDirectory}`);
