import { expect, test } from "bun:test";
import { compile } from "./compile";

const BUTTONS = [
  "btn", "btn-primary", "btn-primary-purple", "btn-primary-dark-blue", "btn-primary-pink",
  "btn-secondary", "btn-tertiary", "btn-outline", "btn-outline-purple", "btn-outline-pink",
  "btn-outline-icon", "btn-dashed", "btn-dashed-dark-blue",
  "btn-disabled", "btn-outline-disabled", "btn-dashed-disabled",
  "btn-icon", "btn-icon-primary", "btn-icon-secondary", "btn-icon-tertiary",
  "btn-icon-outline", "btn-icon-outline-white", "btn-icon-dashed",
];
const TAGS = ["tag", "tag-blue", "tag-purple", "tag-pink"];

test("every button and tag utility compiles", () => {
  const css = compile([...BUTTONS, ...TAGS]);
  for (const u of [...BUTTONS, ...TAGS]) expect(css).toContain(`.${u}`);
});

test("button colours use Figma tokens", () => {
  const css = compile(BUTTONS);
  for (const v of [
    "--color-blue-default", "--color-blue-800", "--color-purple-600",
    "--color-dark-blue-default", "--color-dark-blue-900", "--color-pink-500", "--color-pink-600",
    "--color-black-500",
  ]) expect(css).toContain(`var(${v})`);
});

test("outline buttons react to a .group hover (subvisual-site arrow circle)", () => {
  expect(compile(["btn-outline"])).toContain(".group");
});

test("tags use the 200 fill and 300 hover", () => {
  const css = compile(TAGS);
  for (const c of ["blue", "purple", "pink"]) {
    expect(css).toContain(`var(--color-${c}-200)`);
    expect(css).toContain(`var(--color-${c}-300)`);
  }
});
