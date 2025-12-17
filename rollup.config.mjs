import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default {
  input: "main.ts",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      modules: true,
      extract: "athameui.css",
      minimize: true,
      sourceMap: true,
    }),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "./dist",
      rootDir: "./",
    }),
  ],
};
