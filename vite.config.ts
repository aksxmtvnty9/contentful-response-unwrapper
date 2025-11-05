import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    outDir: "lib",
    copyPublicDir: false,

    lib: {
      name: "contentful-response-unwrapper",
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: "index",
    },
  },

  plugins: [
    dts({
      tsconfigPath: "tsconfig.json",
      insertTypesEntry: true,
      strictOutput: true,
      compilerOptions: {
        declarationMap: true,
      },
    }),
  ],
});
