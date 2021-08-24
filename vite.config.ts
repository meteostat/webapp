import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import vitedgePlugin from 'vitedge/plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(process.cwd(), 'src')}/`
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },

  plugins: [
    vitedgePlugin(),
    vue({
      include: [/\.vue$/],
    }),
    VueI18n.default({
      include: [path.resolve(process.cwd(), 'src/i18n/translations/**')],
    }),
  ],

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  }
})
