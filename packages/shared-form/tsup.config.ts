import { defineConfig } from "tsup"
import { replace } from "esbuild-plugin-replace"

export default defineConfig({
  entry: ["src/index.tsx"],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: true,
  dts: false,
  format: ["cjs", "esm"],
  external: ["react"],
})
