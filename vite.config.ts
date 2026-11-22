import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';

const src = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${src}/`
    }
  },

  plugins: [
    Vue(),
    VueI18n({
      include: [`${src}/i18n/translations/**`],
      // Components use <i18n> custom blocks with inline JSON
      defaultSFCLang: 'json',
      // Translations contain HTML (e.g. links in help texts)
      strictMessage: false,
      escapeHtml: false
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 still uses @import and global color functions internally
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
      }
    }
  }
});
