// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from './vite-plugin-handlebars-precompile.ts'

export default defineConfig({
  plugins: [handlebars()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${__dirname}/src/public/styles/vars.scss";`,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
    },
  },
})
