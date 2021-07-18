const path = require("path");
const { babel } = require("@rollup/plugin-babel");

const babelOptions = {
  presets: ["@babel/preset-env"],
};

module.exports = [
  {
    input: "src/delegate.js",
    output: {
      file: "dist/delegate.js",
      format: "es",
    },
    plugins: [babel(babelOptions)],
  },
  {
    input: "src/lib/meta.js",
    output: {
      file: "dist/lib2.js",
      format: "cjs",
    },
    plugins: [babel(babelOptions)],
  },
];
