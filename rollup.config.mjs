import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import nested from "postcss-nested";
import copy from "rollup-plugin-copy";
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

  watch: {
    include: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.css",
      "tokens.css",
      "styles/**/*.css",
    ],
  },

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

    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
      plugins: ["@emotion/babel-plugin"],
    }),

    copy({
      targets: [
        { src: "tokens.css", dest: "dist" },
        { src: "styles", dest: "dist" },
      ],
      hook: "buildStart",
      copyOnce: false,
      verbose: true,
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
