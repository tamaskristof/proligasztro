// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Hosting: GitHub Pages at https://tamaskristof.github.io/proligasztro/
// When proligasztro.hu is pointed at GitHub Pages: set SITE to 'https://proligasztro.hu',
// BASE to '/', and add public/CNAME containing "proligasztro.hu".
const SITE = 'https://tamaskristof.github.io';
const BASE = '/proligasztro';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [react(), mdx()],
});
