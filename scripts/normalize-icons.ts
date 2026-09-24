// Figma SVG exports → currentColor icons in a 24×24 frame, sized by CSS.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const [src = "raw-icons", dest = "icons"] = process.argv.slice(2);
mkdirSync(dest, { recursive: true });

for (const file of readdirSync(src).filter((f) => f.endsWith(".svg"))) {
  let svg = readFileSync(`${src}/${file}`, "utf8");
  svg = svg.replace(/<mask[\s\S]*?<\/mask>/g, "").replace(/\smask="[^"]*"/g, "");
  svg = svg.replace(/\sid="[^"]*"/g, "");
  svg = svg.replace(/(fill|stroke)="(?!none")[^"]*"/g, '$1="currentColor"');
  svg = svg.replace(/<svg([^>]*)>/, (_, attrs: string) => {
    let a = attrs.replace(/\s(width|height|preserveAspectRatio|style|class)="[^"]*"/g, "");
    // Stroke icons export with overflow around the 24px frame (e.g. 25.5×25.5): re-centre on the frame.
    a = a.replace(/viewBox="0 0 ([\d.]+) \1"/, (m, size: string) => {
      const pad = (Number(size) - 24) / 2;
      return pad > 0 ? `viewBox="${pad} ${pad} 24 24"` : m;
    });
    if (!/\sfill="/.test(a)) a += ' fill="currentColor"';
    return `<svg${a}>`;
  });
  writeFileSync(`${dest}/${file}`, `${svg.trim()}\n`);
}
