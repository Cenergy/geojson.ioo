const webpack = require("webpack");
const path = require("path");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    delegate: ["/src/delegate.js"],
    lib: [
      "/dist/d3.js",
      "/lib/hashchange.js",
      "/lib/blob.js",
      "/lib/base64.js",
      "/lib/bucket.js",
      "/lib/queue.js",
      "/lib/d3.keybinding.js",
      "/lib/d3.trigger.js",
      "/lib/d3-compat.js",
      "/lib/draw/leaflet.draw-src.js",
      "/lib/drag/leaflet.drag.js",
      "/lib/codemirror/lib/codemirror.js",
      "/lib/codemirror/mode/javascript/javascript.js",
    ],
    site: ["/src/index.js"],
  },

  output: {
    filename: "[name].js",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  node: {
    fs: "empty",
  },
  mode: "development",
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|fs/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-reserved-words"]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};
