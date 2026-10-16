// Converts source photos (argv[2] dir) into AVIF + WebP in public/images with a light warm grade.
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join, parse } from "node:path";
const src = process.argv[2];
for (const f of readdirSync(src).filter((f) => f.endsWith(".webp"))) {
  const { name } = parse(f);
  const bw = name.endsWith("-pb");
  const img = sharp(join(src, f)).modulate({ saturation: 0.9 }).recomb([[1.04, 0, 0], [0, 1.0, 0], [0, 0, 0.93]]);
  const base = bw ? sharp(join(src, f)).grayscale() : img;
  await base.clone().avif({ quality: 62 }).toFile(`public/images/${name}.avif`);
  await base.clone().webp({ quality: 82 }).toFile(`public/images/${name}.webp`);
  const m = await sharp(join(src, f)).metadata();
  console.log(name, m.width, m.height);
}
