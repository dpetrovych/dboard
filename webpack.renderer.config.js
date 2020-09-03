const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ],
      },
      { test: /\.(png|ttf|eot|woff2?|svg)$/i, use: ['file-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.png', '.ttf'],
  },
  plugins: [new MiniCssExtractPlugin()],
};
