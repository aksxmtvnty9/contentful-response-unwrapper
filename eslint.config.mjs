import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import tseslint, { plugin } from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: { prettier },
  },
  {
    ignores: [
      "**/.github",
      "**/*.test.ts",
      "**/coverage",
      "**/docs",
      "**/lib",
      "**/node_modules",
      "eslint.config.mjs",
      "typedoc.config.mjs",
      "vite.config.ts",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
