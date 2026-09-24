import { expect, test } from "bun:test";
import { compile, varValue } from "./compile";

// Oracle: Figma variables (Colour section, node 1:155) + code-only tokens.
export const COLORS: Record<string, string> = {
  white: "#ffffff", "white-default": "#ffffff",
  "white-50": "#ffffff", "white-100": "#efefef", "white-200": "#dcdcdc", "white-300": "#bdbdbd", "white-400": "#989898",
  "white-500": "#7c7c7c", "white-600": "#656565", "white-700": "#525252", "white-800": "#464646",
  "white-900": "#3d3d3d", "white-950": "#292929",
  "black-default": "#403f4c",
  "black-25": "#fbfbfb", "black-50": "#f7f7f8", "black-100": "#eeedf1", "black-200": "#d8d8df",
  "black-300": "#b6b6c3", "black-400": "#8f8ea2", "black-500": "#717087", "black-600": "#5b5a6f",
  "black-700": "#4c4a5a", "black-800": "#403f4c", "black-900": "#393842", "black-950": "#26252c",
  "blue-default": "#045cfc",
  "blue-25": "#f9fcff", "blue-50": "#edf8ff", "blue-100": "#d6edff", "blue-200": "#b6e1ff",
  "blue-300": "#84cfff", "blue-400": "#4bb4ff", "blue-500": "#2191ff", "blue-600": "#0970ff", "blue-700": "#045cfc", "blue-800": "#0a46c3",
  "blue-900": "#0f4099", "blue-950": "#0e275d",
  "dark-blue-default": "#2421ab",
  "dark-blue-50": "#ecf2ff", "dark-blue-100": "#dce6ff", "dark-blue-200": "#c0d0ff",
  "dark-blue-300": "#9bb1ff", "dark-blue-400": "#7385ff", "dark-blue-500": "#525dff",
  "dark-blue-600": "#3633f8", "dark-blue-700": "#2d26dc", "dark-blue-800": "#2421ab", "dark-blue-900": "#24248b",
  "dark-blue-950": "#171551",
  "purple-default": "#9563ff",
  "purple-25": "#fafaff", "purple-50": "#f5f2ff", "purple-100": "#ece8ff", "purple-200": "#dcd4ff", "purple-300": "#c3b1ff", "purple-400": "#a685ff", "purple-500": "#9563ff",
  "purple-600": "#7c30f7", "purple-700": "#6e1ee3", "purple-800": "#5c18bf", "purple-900": "#4c169c",
  "purple-950": "#2e0b6a",
  "pink-50": "#fef2f4", "pink-100": "#fde6e9", "pink-200": "#fbd0d9", "pink-300": "#f7aabb",
  "pink-400": "#f3809c", "pink-500": "#e94a75", "pink-600": "#d52960", "pink-700": "#b31d50",
  "pink-800": "#961b49", "pink-900": "#811a44", "pink-950": "#480921",
  "bg-black": "#1e1c17",
  // Code-only (not in Figma), values kept from subvisual-site
  "teal-dark": "#074058", "dark-blue-light": "#3633c5",
};

test("every colour token has its Figma/code value", () => {
  const css = compile(Object.keys(COLORS).map((n) => `bg-${n}`));
  for (const [name, hex] of Object.entries(COLORS)) {
    expect({ name, value: varValue(css, `--color-${name}`) }).toEqual({ name, value: hex });
  }
});

test("old role names are gone", () => {
  const css = compile(["bg-dark", "text-muted", "bg-surface-page", "bg-indigo-default", "bg-blue-hover", "border-purple-border"]);
  for (const old of ["dark", "muted", "surface-page", "indigo-default", "blue-hover", "purple-border"]) {
    expect(varValue(css, `--color-${old}`)).toBeNull();
  }
});
