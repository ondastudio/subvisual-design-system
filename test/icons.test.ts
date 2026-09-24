import { expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(import.meta.dir, "../icons");
const files = () => readdirSync(dir).filter((f) => f.endsWith(".svg"));

test("all Figma icons are present", () => {
  expect(files().length).toBe(54);
});

test("icons are normalised", () => {
  for (const f of files()) {
    const svg = readFileSync(join(dir, f), "utf8");
    const root = /<svg[^>]*>/.exec(svg)?.[0] ?? "";
    expect({ f, viewBox: /viewBox="[^"]+"/.test(root) }).toEqual({ f, viewBox: true });
    expect({ f, sized: /\s(width|height)="/.test(root) }).toEqual({ f, sized: false });
    expect({ f, hex: /(fill|stroke)="(#|var\()/i.test(svg) }).toEqual({ f, hex: false });
    expect({ f, mask: svg.includes("<mask") }).toEqual({ f, mask: false });
    expect({ f, current: svg.includes("currentColor") }).toEqual({ f, current: true });
    expect({ f, box: /viewBox="\S+ \S+ 24 24"/.test(root) }).toEqual({ f, box: true });
    expect({ f, ids: /\sid="/.test(svg) }).toEqual({ f, ids: false });
  }
});
