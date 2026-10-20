import fs from 'node:fs/promises';
import sharp from 'sharp';

// Preserve the Figma artwork, but exclude the exported slide/card frame.
// Each illustration is its own SVG viewport, so CSS no longer crops a full card.
const folder = new URL('../public/portfolio/partnerit/visuals/', import.meta.url);
for (const name of ['matching', 'data', 'meeting', 'collaboration']) {
  const original = await fs.readFile(new URL(`service-${name}-original.svg`, folder), 'utf8');
  let artwork = original.replace(/<path\b[^>]*(?:fill|stroke)="#E7E9EC"[^>]*\/>/g, '');
  if (artwork === original) throw new Error(`Missing exported card outline: ${name}`);
  artwork = artwork.replace('<g clip-path="url(#clip2_164_5997)">', '<g>');
  if (name !== 'collaboration') {
    artwork = artwork.replace('height="491" viewBox="0 0 330 491"', 'height="190" viewBox="0 300.368 330 190"');
  }
  // Only the calendar's embedded icon/avatar bitmaps need right-sizing.
  // Paths, typography, filters and the original bitmap placement stay intact.
  if (name === 'collaboration') {
    for (const match of artwork.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)) {
      const bitmap = await sharp(Buffer.from(match[1], 'base64'))
        .resize({ width: 256, height: 256, fit: 'inside', withoutEnlargement: true })
        .webp({ lossless: true, effort: 6 })
        .toBuffer();
      artwork = artwork.replace(match[0], `data:image/webp;base64,${bitmap.toString('base64')}`);
    }
  }
  const output = `service-${name}-${name === 'collaboration' ? 'optimized' : 'artwork'}.svg`;
  await fs.writeFile(new URL(output, folder), artwork);
  console.log(JSON.stringify({ output, originalBytes: Buffer.byteLength(original), artworkBytes: Buffer.byteLength(artwork) }));
}
