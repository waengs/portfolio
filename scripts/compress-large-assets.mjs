/**
 * Resize + compress assets over 2MB (PNG/JPG/JPEG).
 * Run: node scripts/compress-large-assets.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve("src/image_assets/porto web assets");
const MIN_BYTES = 2 * 1024 * 1024;
const MAX_EDGE = 1920;

function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function compressFile(filePath) {
  const before = fs.statSync(filePath).size;
  if (before < MIN_BYTES) return null;

  const meta = await sharp(filePath).metadata();
  let pipeline = sharp(filePath, { failOn: "none" });

  if ((meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE) {
    pipeline = pipeline.resize(MAX_EDGE, MAX_EDGE, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const tmp = `${filePath}.opt.tmp`;
  if (/\.png$/i.test(filePath)) {
    await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(tmp);
  }

  const after = fs.statSync(tmp).size;
  if (after >= before) {
    fs.unlinkSync(tmp);
    return null;
  }

  fs.renameSync(tmp, filePath);
  return { before, after };
}

const files = walkFiles(ROOT);
let saved = 0;
let count = 0;

for (const file of files) {
  try {
    const result = await compressFile(file);
    if (!result) continue;
    count++;
    saved += result.before - result.after;
    console.log(
      `${path.basename(file)}: ${(result.before / 1024 / 1024).toFixed(2)}MB → ${(result.after / 1024 / 1024).toFixed(2)}MB`,
    );
  } catch (error) {
    console.error(`skip ${file}:`, error.message);
  }
}

console.log(`\nDone — optimized ${count} files, saved ${(saved / 1024 / 1024).toFixed(1)}MB`);
