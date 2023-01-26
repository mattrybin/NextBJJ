import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ["src/**/*.ts"]
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'lib',
      fileName: (format) => `lib.${format}.js`
    },

  },
})