import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import pkg from "../package.json";
import { compile } from "./compile";

// Acta and Colfax are licensed: this package is public, so it must never ship them.
test("no font files are shipped", () => {
  expect(existsSync(resolve(import.meta.dir, "../fonts"))).toBe(false);
  expect(Object.keys(pkg.exports)).not.toContain("./fonts/*");
  expect(pkg.files).not.toContain("fonts");
});

test("no @font-face is emitted; projects declare their own", () => {
  expect(compile(["font-heading", "font-body"])).not.toContain("@font-face");
});
