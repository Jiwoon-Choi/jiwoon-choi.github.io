import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://jiwoon-choi.github.io',
  integrations: [react()]
});