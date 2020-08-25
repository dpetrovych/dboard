const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|ttf)$/i, use: ['file-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.png', '.ttf'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};
