import { copyFile, mkdir, readdir } from 'node:fs/promises';
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

const srcRoot = new URL('../for', import.meta.url).pathname;
const destRoot = new URL('../dist/for', import.meta.url).pathname;

copyRecursive(srcRoot, destRoot)
  .then(() => console.log('Copied static /for pages into dist/for'))
  .catch((error) => {
    console.error('Failed to copy static /for pages:', error);
    process.exit(1);
  });
