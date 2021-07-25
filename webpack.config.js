const webpack = require('webpack');
const path = require('path');

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

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const aaa = path.resolve(__dirname, '/');

module.exports = {
  entry: {
    lib: [
      '/dist/d3.js',
      '/lib/hashchange.js',
      '/lib/blob.js',
      '/lib/base64.js',
      '/lib/bucket.js',
      '/lib/queue.js',
      '/lib/d3.keybinding.js',
      '/lib/d3.trigger.js',
      '/lib/d3-compat.js',
      '/lib/draw/leaflet.draw-src.js',
      '/lib/drag/leaflet.drag.js',
      '/lib/codemirror/lib/codemirror.js',
      '/lib/codemirror/mode/javascript/javascript.js',
    ],
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  node: {
    fs: 'empty',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-reserved-words'],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
  plugins: [
    // 自动清空打包的目录
    new RemovePlugin({
      after: {
        root: './public',
        trash: true
    }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'css', to: path.resolve(__dirname, 'public/css') },
        { from: 'data', to: path.resolve(__dirname, 'public/data') },
        { from: 'dist', to: path.resolve(__dirname, 'public/dist') },
        { from: 'img', to: path.resolve(__dirname, 'public/img') },
        { from: 'leaflet', to: path.resolve(__dirname, 'public/leaflet') },
        { from: 'lib', to: path.resolve(__dirname, 'public/lib') },
        {
          from: 'index.html',
          to: path.resolve(__dirname, 'public/index.html'),
        },
      ],
    }),
  ],
};
