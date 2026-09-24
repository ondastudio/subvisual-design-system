import { expect, test } from "bun:test";
import { compile, varValue } from "./compile";

test("radius and animation tokens", () => {
  const css = compile(["rounded-pill", "rounded-navbar", "animate-slide-up-in", "animate-fade-up-in", "animate-scroll"]);
  expect(varValue(css, "--radius-pill")).toBe("2.75rem");
  expect(varValue(css, "--radius-navbar")).toBe("12.5rem");
  expect(varValue(css, "--animate-scroll")).toBe("scroll 20s linear infinite");
  for (const k of ["slide-up-in", "fade-up-in", "scroll"]) expect(css).toContain(`@keyframes ${k}`);
});

test("link utilities use Figma colour names", () => {
  const css = compile(["link", "link-purple", "link-secondary", "link-inverted", "link-disabled"]);
  for (const u of ["link", "link-purple", "link-secondary", "link-inverted", "link-disabled"]) {
    expect(css).toContain(`.${u} {`);
  }
  expect(css).toContain("var(--color-black-default)");
  expect(css).toContain("var(--color-black-500)");
  expect(css).not.toContain("var(--color-dark)");
  expect(css).not.toContain("var(--color-muted)");
});
