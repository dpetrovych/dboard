const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(__dirname, './dist/main.js'),
});

const devtool = 'inline-source-map';
const mode = 'development';
const outputPath = path.resolve(__dirname, 'dist');

const main = {
  devtool,
  entry: {
    main: './src/main.ts',
    preload: './src/preload.ts',
  },
  mode,
  module: {
    rules: [{ test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: { filename: '[name].js', path: outputPath },
  target: 'electron-main',
};

const renderer = {
  devtool,
  entry: { renderer: './src/renderer.ts' },
  mode,
  module: {
    rules: [
      { test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|ttf)$/i, use: ['file-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: { filename: '[name].js', path: outputPath },
  plugins: [
    ElectronReloadPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
    }),
  ],
  target: 'electron-renderer',
};

module.exports = [main, renderer];
