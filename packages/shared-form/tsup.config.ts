import { defineConfig } from "tsup"
import { replace } from "esbuild-plugin-replace"

export default defineConfig({
  entry: ["src/index.tsx"],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
  external: ["react"],
  esbuildPlugins: [
    replace({
      "import.meta.vitest": "undefined",
    }),
  ],
})
