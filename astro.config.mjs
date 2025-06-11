// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import solidJs from '@astrojs/solid-js';

import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), solidJs(), vue(), sitemap(), partytown()]
});