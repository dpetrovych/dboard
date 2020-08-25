module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [{ test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};