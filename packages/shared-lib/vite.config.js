import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
   includeSource: ["src/**/*.ts"] 
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'lib',
      // the proper extensions will be added
    fileName: (format) => `lib.${format}.js`
    },
    
  },
})