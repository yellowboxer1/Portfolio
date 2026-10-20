import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const base = path.join(root, 'public/portfolio/partnerit');
const output = path.join(base, 'optimized');
await fs.mkdir(output, { recursive: true });
const files = ['profile-current.webp', 'notices-current.webp', 'report-current.webp', 'consortium-current.webp', 'plan-diagnosis.webp', 'plan-comparison.webp', 'collaboration-chat.webp'];
const manifest = {};
for (const file of files) {
  const stem = path.parse(file).name;
  const png = path.join(base, 'source', `${stem}.png`);
  const input = await fs.readFile(await fs.access(png).then(() => png).catch(() => path.join(base, 'source', file)));
  const metadata = await sharp(input).metadata();
  const widths = [...new Set([480, 768, 1280, metadata.width].filter(w => w <= metadata.width))].sort((a, b) => a - b);
  const variants = [];
  for (const width of widths) {
    const buffer = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 86, effort: 6, smartSubsample: true }).toBuffer();
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10);
    const name = `${stem}-${width}-${hash}.webp`;
    await fs.writeFile(path.join(output, name), buffer);
    variants.push({ width, src: `/portfolio/partnerit/optimized/${name}`, bytes: buffer.length });
  }
  manifest[file] = { src: variants.at(-1).src, srcSet: variants.map(v => `${v.src} ${v.width}w`).join(', '), variants };
}
for (const [file, width, quality] of [['imgImgAiPc011.webp', 960, 65], ['imgImgAiPc0121.webp', 400, 86], ['imgImgAiPc0111.webp', 240, 86]]) {
  const input = await fs.readFile(path.join(base, 'visuals', file));
  const buffer = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10);
  const name = `${path.parse(file).name}-${width}-${hash}.webp`;
  await fs.writeFile(path.join(output, name), buffer);
  manifest[file] = { src: `/portfolio/partnerit/optimized/${name}`, bytes: buffer.length };
}
for (const [folder, file] of [
  ['visuals', 'logo-glass-poster-v3.webp'],
  ['source', 'wordmark.webp'],
  ['visuals', 'service-matching-artwork.svg'],
  ['visuals', 'service-data-artwork.svg'],
  ['visuals', 'service-meeting-artwork.svg'],
  ['visuals', 'service-collaboration-optimized.svg'],
]) {
  const buffer = await fs.readFile(path.join(base, folder, file));
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10);
  const name = `${path.parse(file).name}-${hash}${path.extname(file)}`;
  await fs.writeFile(path.join(output, name), buffer);
  manifest[file] = { src: `/portfolio/partnerit/optimized/${name}`, bytes: buffer.length };
}
await fs.writeFile(path.join(root, 'src/app/portfolio/partnerit/image-assets.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k, v.variants ? v.variants.map(a => ({ width: a.width, bytes: a.bytes })) : v.bytes])), null, 2));
