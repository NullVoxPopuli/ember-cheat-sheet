import path from "node:path";
import fs from "node:fs/promises";
import { constants } from "node:fs";

const TRANSLATIONS = path.join(import.meta.dirname, "..", "translations");

async function globby(patterns, { cwd }) {
  return Array.fromAsync(fs.glob(patterns, { cwd }));
}

/**
 * This script is idempotent, so there is no risk in running it multiple times,
 * even if real translations already exist
 */
async function main() {
  // First, rename any straggling `yaml` files to `yml`
  for (let filePath of await globby(["**/*.yaml"], { cwd: TRANSLATIONS })) {
    await fs.rename(
      path.join(TRANSLATIONS, filePath),
      path.join(TRANSLATIONS, filePath.replace(".yaml", ".yml")),
    );
  }

  // Find all the places where translations exist
  let paths = await globby(["**/en-us.yml"], { cwd: TRANSLATIONS });

  // Determine all supported languages
  let all = new Set(
    (await globby(["**/*.yaml", "**/*.yml"], { cwd: TRANSLATIONS })).map((filePath) =>
      path.basename(filePath),
    ),
  );

  // ensure each of the translations exists
  for (let enUsPath of paths) {
    let fullPath = path.join(TRANSLATIONS, enUsPath);

    // locale includes the .yml file extension
    for (let locale of all) {
      // This is the source language, and we can skip it
      if (locale.includes("en-us")) continue;

      let directory = path.dirname(fullPath);
      let target = path.join(directory, locale);

      if (await exists(target)) continue;

      // locale does not exist, copy the en-us to the target locale
      await fs.copyFile(fullPath, target);
    }
  }
}

main();

// utils

async function exists(filePath) {
  try {
    await fs.access(filePath, constants.R_OK | constants.W_OK);

    return true;
  } catch {
    return false;
  }
}
