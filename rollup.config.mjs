import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import nested from "postcss-nested";
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
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      compilerOptions: {
        preserveConstEnums: true,
      },
    }),
    postcss({
      plugins: [nested()],
      extract: true,
    }),
  ],
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      banner: '"use client";',
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      banner: '"use client";',
    },
  ],
};
