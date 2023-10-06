import { defineConfig, Options } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.ts"],
  entryPoints: ['src/index.ts'],
  format: ["esm"],
  dts: true,
  minify: true,
  clean: true,
  target: "es2020",
  ...options,
}));

// "cjs"

// export const tsup: Options = {
//   splitting: true,
//   clean: true, // clean up the dist folder
//   // generate dts files
//   format: ['cjs', 'esm'], // generate cjs and esm files
//   minify: env === 'production',
//   bundle: env === 'production',
//   skipNodeModulesBundle: true,

//   watch: env === 'development',
//   target: 'es2020',
//   outDir: env === 'production' ? 'dist' : 'lib',
//   entry: ['src/**/*.ts'], //include all files under src
// };