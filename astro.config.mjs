// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Hosting: GitHub Pages with the custom domain proligasztro.hu (public/CNAME).
// Without the custom domain it would be SITE 'https://tamaskristof.github.io', BASE '/proligasztro'.
const SITE = 'https://proligasztro.hu';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [react(), mdx()],
});
