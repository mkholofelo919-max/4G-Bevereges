const fs = require('node:fs/promises');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const publicDirectory = path.join(projectRoot, 'public');

async function build() {
  await fs.mkdir(publicDirectory, { recursive: true });
  await fs.copyFile(
    path.join(projectRoot, 'index.html'),
    path.join(publicDirectory, 'index.html'),
  );
  console.log('Built public/index.html');
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
