// Same drawing scaled? Compare every path number after scaling to 40px.
import { readFileSync } from "node:fs";

const nums = (file: string) =>
  [...readFileSync(file, "utf8").matchAll(/\sd="([^"]+)"/g)]
    .flatMap((m) => m[1].match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [])
    .map(Number);

const base = nums("raw-icons/optical/40.svg");
for (const size of [24, 20]) {
  const other = nums(`raw-icons/optical/${size}.svg`).map((n) => (n * 40) / size);
  const same = other.length === base.length && other.every((n, i) => Math.abs(n - base[i]) < 0.1);
  console.log(`${size}px vs 40px: ${same ? "SAME drawing (scaled)" : "DIFFERENT drawing"}`);
}
