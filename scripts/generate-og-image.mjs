import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const svg = readFileSync(resolve('public/og-image.svg'));

await sharp(svg)
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile(resolve('public/og-image.png'));

console.log('✅ og-image.png created (1200×630)');
