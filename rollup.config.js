import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: ["./src/delegate.js"],
    output: {
      file: "./dist/delegate.js",
      format: "umd",
      name: "delegate",
    },   
    plugins: [resolve(), commonjs(), babel(), terser()],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/site.js",
      format: "cjs",
      name: "site",
    },
    plugins: [resolve()],
  },
];
