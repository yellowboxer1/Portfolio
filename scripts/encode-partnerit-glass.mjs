// Render with render-partnerit-glass.py first. No network dependencies.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frames = path.join(root, "tmp/partnerit-glass-final/motion-frames-v2");
const output = path.join(root, "public/portfolio/partnerit/visuals");

for (let frame = 1; frame <= 64; frame += 1) {
  const file = path.join(frames, `${String(frame).padStart(4, "0")}.png`);
  if (!fs.existsSync(file)) throw new Error(`Missing rendered frame: ${file}`);
}

const mp4 = path.join(output, "logo-glass-motion-v3.mp4");
execFileSync(ffmpeg, [
  "-y", "-hide_banner", "-loglevel", "warning", "-i", path.join(frames, "0001.png"),
  "-frames:v", "1", "-c:v", "libwebp", "-q:v", "92",
  path.join(output, "logo-glass-poster-v3.webp"),
], { stdio: "inherit" });
const decodedHashes = execFileSync(ffmpeg, [
  "-hide_banner", "-loglevel", "error", "-framerate", "16/3", "-i", path.join(frames, "%04d.png"),
  "-an", "-f", "framemd5", "-",
], { encoding: "utf8" }).split("\n").filter(line => line && !line.startsWith("#")).map(line => line.split(",").at(-1).trim());
if (decodedHashes.length !== 64 || new Set(decodedHashes).size < 60) {
  throw new Error("Motion validation failed: expected 64 changing rendered frames.");
}
// Interpolate a middle cycle so both ends have real neighboring frames.
// The result is 12 seconds at 24 fps, with no duplicated end-frame pause.
execFileSync(ffmpeg, [
  "-y", "-hide_banner", "-loglevel", "warning",
  "-stream_loop", "2", "-framerate", "16/3", "-start_number", "1",
  "-i", path.join(frames, "%04d.png"),
  "-vf", "minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,trim=start=12:end=24,setpts=PTS-STARTPTS,format=yuv420p",
  "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "18",
  "-movflags", "+faststart", mp4,
], { stdio: "inherit" });

execFileSync(ffmpeg, [
  "-y", "-hide_banner", "-loglevel", "warning", "-i", mp4,
  "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "27",
  "-row-mt", "1", "-deadline", "good", "-cpu-used", "3",
  path.join(output, "logo-glass-motion-v3.webm"),
], { stdio: "inherit" });

fs.copyFileSync(path.join(root, "tmp/partnerit-glass-final/partnerit-glass.blend"), path.join(root, "output/partnerit-glass.blend"));
for (const file of [mp4, path.join(output, "logo-glass-motion-v3.webm")]) {
  console.log(`${path.basename(file)}: ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}
