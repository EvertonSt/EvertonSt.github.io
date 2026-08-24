import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const svg = readFileSync(resolve('public/favicon.svg'));

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(resolve('public', name));
  console.log(`✅ ${name} (${size}×${size})`);
}

console.log('\nAll favicons generated.');
