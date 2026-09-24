import { expect, test } from "bun:test";
import { compile } from "./compile";

test("theme.css compiles with Tailwind", () => {
  expect(() => compile([])).not.toThrow();
});
