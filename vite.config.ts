import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults } from 'vitest/config';

export default defineConfig(({ mode }) => {
  console.log(`Building for mode: ${mode}`);

  return {
    build: {
      emptyOutDir: true,
      minify: false,
      sourcemap: true,
      outDir: 'lib',
      copyPublicDir: false,

      lib: {
        name: 'contentful-response-unwrapper',
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
    },

    plugins: [
      dts({
        tsconfigPath: 'tsconfig.json',
        insertTypesEntry: true,
        strictOutput: true,
        compilerOptions: {
          declarationMap: true,
        },
      }),
    ],

    test: {
      coverage: {
        thresholds: {
          100: true, // Let's see if this is realistic :P
        },
        enabled: true,
        include: ['src/**'],
        exclude: [...configDefaults.exclude, '**/lib/**', 'src/index.ts', 'src/types'],
        reporter: ['text', 'json-summary', 'json'],
      },
      environment: 'jsdom',
      globals: true,
    },
  };
});
