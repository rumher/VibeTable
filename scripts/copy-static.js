import { access, copyFile, mkdir, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

async function copyRecursive(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const srcRoot = fileURLToPath(new URL('../for', import.meta.url));
const destRoot = fileURLToPath(new URL('../dist/for', import.meta.url));

try {
  const srcExists = await pathExists(srcRoot);

  if (!srcExists) {
    console.log('No optional static /for source directory found; skipping copy.');
    process.exit(0);
  }

  await copyRecursive(srcRoot, destRoot);
  console.log('Copied static /for pages into dist/for');
} catch (error) {
  console.error('Failed to copy static /for pages:', error);
  process.exit(1);
}
