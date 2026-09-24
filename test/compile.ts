import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const cli = join(root, "node_modules/.bin/tailwindcss");

export function compile(classes: string[]): string {
  const dir = mkdtempSync(join(root, "test", ".tmp-"));
  try {
    writeFileSync(join(dir, "index.html"), `<div class="${classes.join(" ")}"></div>`);
    writeFileSync(
      join(dir, "in.css"),
      `@import "tailwindcss" source(none);\n@import "../../theme.css";\n@source "./index.html";\n`,
    );
    const r = Bun.spawnSync([cli, "-i", join(dir, "in.css"), "-o", join(dir, "out.css")], { cwd: root });
    if (r.exitCode !== 0) throw new Error(r.stderr.toString());
    return readFileSync(join(dir, "out.css"), "utf8");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function normalise(value: string): string {
  const v = value.trim().toLowerCase();
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(v);
  return short ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}` : v;
}

export function varValue(css: string, name: string): string | null {
  const m = new RegExp(`${name}:\\s*([^;]+);`).exec(css);
  return m ? normalise(m[1]) : null;
}

export function desktopBlock(css: string): string {
  const m = /@media[^{]*768px[^{]*\{\s*:root\s*\{([^}]*)\}/.exec(css);
  if (!m) throw new Error("desktop @media block not found");
  return m[1];
}
