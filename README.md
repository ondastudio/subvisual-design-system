# @subvisual/design-system

The Subvisual style guide as Tailwind CSS v4 tokens and utilities, plus icons.
Source of truth: [Figma: Subvisual Website 2025](https://www.figma.com/design/mq60NkOd6LWnpGvoBublPv/Subvisual-Website-2025).

Used by subvisual-site (Astro + React) and the content hub (Nuxt). It ships **CSS only**, and each project builds its own components.

## Install

```bash
bun add github:ondastudio/subvisual-design-system#v0.2.0
```

```css
/* your global CSS */
@import "tailwindcss";
@import "@subvisual/design-system/theme.css";
```

## Fonts (required, not included)

Acta and Colfax are commercial fonts, so they are **not** in this public package. The package only names them: `font-heading` is `"Acta"` and `font-body` is `"Colfax"`. Each project keeps its own licensed `.woff2` files and declares them in its global CSS, after the imports above:

```css
@font-face {
  font-family: "Acta";
  src: url("./fonts/Acta-Book.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Colfax";
  src: url("./fonts/Colfax-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Colfax";
  src: url("./fonts/Colfax-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

Adjust the paths to wherever the project keeps the files. Never commit the font files to this repo.

## What's inside

| Area | Classes |
|---|---|
| Colours | `{bg,text,border,…}-` + `white`, `white-default`, `white-50…950`, `black-default`, `black-25…950`, `blue-default`, `blue-25…950`, `dark-blue-default`, `dark-blue-50…950`, `purple-default`, `purple-25…950`, `pink-50…950`, `bg-black`, `teal-dark`, `dark-blue-light` |
| Type | `font-heading` (Acta), `font-body` (Colfax); `text-h1…h5`, `text-body-lg/md/sm/xsm` with `tracking-h1…h5`, `tracking-body-lg` (mobile first, desktop from 768px) |
| Radius / motion | `rounded-pill`, `rounded-navbar`, `animate-slide-up-in`, `animate-fade-up-in`, `animate-scroll` |
| Links | `link`, `link-purple`, `link-secondary`, `link-inverted`, `link-disabled` |
| Buttons | `btn` + `btn-primary[-purple,-dark-blue,-pink]`, `btn-secondary`, `btn-tertiary`, `btn-outline[-purple,-pink]`, `btn-dashed[-dark-blue]`; standalone: `btn-outline-icon` (no `btn`); disabled: `btn-disabled`, `btn-outline-disabled`, `btn-dashed-disabled` |
| Icon buttons | `btn-icon` + `btn-icon-primary`, `-secondary`, `-tertiary`, `-outline`, `-outline-white`, `-dashed` |
| Tags | `tag` + `tag-blue`, `tag-purple`, `tag-pink` |
| Icons | `icons/*.svg`: 24×24 frame, `currentColor`, no fixed size. Import raw (`…/icons/handshake.svg?raw`), render inline, and size/colour with classes (`size-6 text-blue-default`). |

`calendar`, `checkbox-checked`, `group` and `person` come from the website designs (the rhythm timelines), not the Figma icon library. Every other icon is exported from the library.

Spacing and layout use Tailwind's default scale. Figma's spacing values (8/16/20/24/28/32/36/40/56/60/80/96/120px) are all on it.

**Heads-up:** only the colours listed above are Subvisual colours. Other Tailwind families (`red-*`, `gray-*`, …) still exist from Tailwind's defaults, so don't use them.

## Icons licence

The icons are [Material Symbols](https://github.com/google/material-design-icons) by Google (weight 200), licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Releasing

Change files, run `bun test`, bump `version` in package.json, commit, `git tag vX.Y.Z && git push --tags`. Then bump the tag in each project.
