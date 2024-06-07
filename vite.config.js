// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import handlebars from './vite-plugin-handlebars-precompile.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [handlebars()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${__dirname}/src/styles/vars.scss";`,
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
