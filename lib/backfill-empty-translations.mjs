'use strict';

import path from 'path';
import fs from 'fs/promises';
import { globby } from 'globby';

// this might have different behavior if not using YARN
// in /app, PWD is still the root.
const root = process.env.PWD;
const TRANSLATIONS = path.join(root, 'translations');

async function main() {
  // First, rename any straggling `yaml` files to `yml`
  for (let filePath of await globby(['**/*.yaml'], { cwd: TRANSLATIONS })) {
    await fs.rename(
      path.join(TRANSLATIONS, filePath),
      path.join(TRANSLATIONS, filePath.replace('.yaml', '.yml'))
    );
  }

  // Find all the places where translations exist
  let paths = await globby(['**/en-us.yml'], { cwd: TRANSLATIONS });

  /**
    * Determine all supported languages
    *
    * With upcoming Pipelines:
    *
    * let all = await globby(...)
    *   |> ^.map(...)
    *   |> new Set(...^)
    */
  let all = new Set(
    (await globby(['**/*.yaml', '**/*.yml'], { cwd: TRANSLATIONS }))
    .map(filePath => path.basename(filePath)));

  console.log({ all });

  // ensure each of the translations exists
  for (let path of paths) {

  }
}

main();


// utils
