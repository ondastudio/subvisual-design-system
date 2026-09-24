import { expect, test } from "bun:test";
import { compile, desktopBlock, varValue } from "./compile";

const CLASSES = [
  "font-heading", "font-body",
  ...["h1", "h2", "h3", "h4", "h5"].flatMap((h) => [`text-${h}`, `tracking-${h}`]),
  "text-body-lg", "tracking-body-lg", "text-body-md", "text-body-sm", "text-body-xsm",
];

// Figma text styles. Mobile = default, desktop = @media (min-width: 768px).
const MOBILE: Record<string, string> = {
  "--text-h1": "2.5rem", "--text-h1--line-height": "1.1", "--tracking-h1": "-0.05rem",
  "--text-h2": "2rem", "--text-h2--line-height": "2.25rem", "--tracking-h2": "-0.04rem",
  "--text-h3": "1.75rem", "--text-h3--line-height": "2rem", "--tracking-h3": "-0.035rem",
  "--text-h4": "1.5rem", "--text-h4--line-height": "1.75rem", "--tracking-h4": "-0.015rem",
  "--text-h5": "1.25rem", "--text-h5--line-height": "1.5rem", "--tracking-h5": "-0.0125rem",
  "--text-body-lg": "1.25rem", "--text-body-lg--line-height": "1.5rem", "--tracking-body-lg": "-0.00625rem",
  "--text-body-md": "1rem", "--text-body-md--line-height": "1.25rem",
  "--text-body-sm": "0.875rem", "--text-body-sm--line-height": "1rem",
  "--text-body-xsm": "0.75rem", "--text-body-xsm--line-height": "0.875rem",
};
const DESKTOP: Record<string, string> = {
  "--text-h1": "4rem", "--text-h1--line-height": "1", "--tracking-h1": "-0.08rem",
  "--text-h2": "3rem", "--text-h2--line-height": "3.25rem", "--tracking-h2": "-0.06rem",
  "--text-h3": "2.25rem", "--text-h3--line-height": "2.5rem", "--tracking-h3": "-0.045rem",
  "--text-h4": "1.75rem", "--text-h4--line-height": "2rem", "--tracking-h4": "-0.035rem",
  "--text-h5": "1.5rem", "--text-h5--line-height": "1.75rem", "--tracking-h5": "-0.015rem",
  "--tracking-body-lg": "-0.025rem",
};

test("mobile type scale matches Figma", () => {
  const css = compile(CLASSES);
  for (const [name, value] of Object.entries(MOBILE)) {
    expect({ name, value: varValue(css, name) }).toEqual({ name, value });
  }
});

test("desktop type scale matches Figma", () => {
  const block = desktopBlock(compile(CLASSES));
  for (const [name, value] of Object.entries(DESKTOP)) {
    expect({ name, value: varValue(block, name) }).toEqual({ name, value });
  }
});

test("font family tokens are declared", () => {
  const css = compile(CLASSES);
  expect(varValue(css, "--font-heading")).toBe('"acta", serif');
  expect(varValue(css, "--font-body")).toBe('"colfax", sans-serif');
});
