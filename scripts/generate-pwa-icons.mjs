import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const logoPath = join(publicDir, 'images', 'okuhle-logo.png');

if (!existsSync(logoPath)) {
  console.error('Missing public/images/okuhle-logo.png');
  process.exit(1);
}

const source = sharp(logoPath);
const meta = await source.metadata();

// Square padded icons for PWA / favicon from full logo
async function makeSquarePng(size, outName, background = '#ffffff') {
  const padded = Math.round(size * 0.82);
  const buf = await sharp(logoPath)
    .resize({
      width: padded,
      height: padded,
      fit: 'contain',
      background,
    })
    .extend({
      top: Math.floor((size - padded) / 2),
      bottom: Math.ceil((size - padded) / 2),
      left: Math.floor((size - padded) / 2),
      right: Math.ceil((size - padded) / 2),
      background,
    })
    .png()
    .toFile(join(publicDir, outName));

  console.log(`Created ${outName} (${size}x${size})`);
}

await makeSquarePng(192, 'pwa-192x192.png');
await makeSquarePng(512, 'pwa-512x512.png');
await makeSquarePng(180, 'apple-touch-icon.png');
await makeSquarePng(32, 'favicon-32x32.png');
await makeSquarePng(16, 'favicon-16x16.png');

console.log(`Source logo ${meta.width}x${meta.height}`);
