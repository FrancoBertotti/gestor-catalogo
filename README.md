# Gestor de Catálogo — Practical Thinking

Panel de administración para gestionar el catálogo de productos de Practical Thinking. Permite crear, editar y eliminar productos, categorías, subcategorías y materiales, con autenticación protegida vía Supabase.

**Autor:** Franco Bertotti ([@FrancoBertotti](https://github.com/FrancoBertotti))

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|------------|---------|-----|
| [Next.js](https://nextjs.org) | 16.x | Framework principal (App Router) |
| [React](https://react.dev) | 19.x | UI |
| [Supabase](https://supabase.com) | 2.x | Base de datos y autenticación |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos |
| TypeScript | 5.x | Tipado estático |

---

## Estructura del proyecto

```
app/
├── login/               # Página e lógica de autenticación
├── admin/               # Panel de administración (rutas protegidas)
│   ├── products/        # CRUD de productos
│   ├── categories/      # CRUD de categorías y subcategorías
│   └── materials/       # CRUD de materiales
└── layout.tsx           # Layout raíz con fuentes y estilos globales
```

---

## Instalación y desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/FrancoBertotti/gestor-catalogo.git
cd gestor-catalogo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env.local` en la raíz con las credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 4. Levantar el servidor de desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Sistema de diseño — Practical Thinking

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

### Despliegue

Se realizó con Vercel por medio de GithHub, conectado a Supabase para la gestion de la base de datos.

link: https://gestor-catalogo.vercel.app/login

autor: Franco Bertotti - Practical Thinking

