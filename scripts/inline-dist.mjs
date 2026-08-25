import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const htmlPath = path.join(distDir, 'index.html');

const html = await fs.readFile(htmlPath, 'utf8');

const styleMatch = html.match(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/
);

if (!styleMatch) {
  throw new Error('Could not find the built stylesheet reference in dist/index.html');
}

const stylePath = path.join(distDir, styleMatch[1]);

const styleContent = await fs.readFile(stylePath, 'utf8');

const inlinedHtml = html
  .replace(
    /<link rel="stylesheet" crossorigin href="[^"]+">/,
    () => `<style>${styleContent}</style>`
  );

await fs.writeFile(htmlPath, inlinedHtml, 'utf8');
