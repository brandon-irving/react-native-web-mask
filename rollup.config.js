import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { visualizer } from "rollup-plugin-visualizer";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs", // CommonJS
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es", // ES Module
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/types",
        rootDir: "src",
        sourceMap: true,
      }),
      visualizer({ filename: "./stats.html" }),
    ],
    external: ["react", "react-native"],
  },
];
