This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design System — Practical Thinking

Copiá este bloque para replicar el estilo en otros sistemas.

### Fuentes

| Rol | Familia | Pesos | Variable CSS |
|-----|---------|-------|--------------|
| Principal (texto, títulos, botones) | `Space Grotesk` | 300 400 500 600 700 | `--font-principal` |
| Secundaria (mono, badges, códigos) | `JetBrains Mono` | 400 500 700 | `--font-secundaria` |

```ts
// lib/fonts.ts
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

export const fontPrincipal = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-principal',
  display: 'swap',
});

export const fontSecundaria = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-secundaria',
  display: 'swap',
});
```

### Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| Naranja primario | `#dc4a1b` | CTA, bordes de navbar, selection highlight, glow |
| Naranja hover | `#f67043` | Hover de botones, badges activos, texto de acento cálido |
| Cyan primario | `#1bacdc` | Links de navegación, acentos info, hover en footer |
| Cyan hover | `#afe1f1` | Hover de links en navbar |
| Fondo base | `#000000` | Fondo del body (negro puro) |
| Texto principal | `#ffffff` | Texto sobre fondo negro |
| Neutros UI | `neutral-300/400/500/800/900/950` | Texto secundario, bordes, superficies |

### CSS base

```css
/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-principal);
  --font-mono: var(--font-secundaria);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-principal), Arial, Helvetica, sans-serif;
}
```

```tsx
// layout.tsx — body className base
className={`${fontPrincipal.variable} ${fontSecundaria.variable} antialiased bg-black text-white selection:bg-[#dc4a1b] selection:text-white`}
```

### Convenciones visuales

- **Sin bordes redondeados** — usar `rounded-none` en toda la UI.
- **Texto en `lowercase`** — estilo editorial para elementos de navegación y UI general.
- **Labels y badges** — `uppercase tracking-wider` con `font-mono`, prefijo `//` estilo código.
- **Glow en botones CTA** — `shadow-[0_0_20px_rgba(220,74,27,0.3)]` hover: `rgba(220,74,27,0.5)`.
- **Grilla decorativa de fondo** — `bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem]` con `mask-image` radial.
- **Superficies internas** — `bg-neutral-950`, `border border-neutral-800`, sin radius.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```