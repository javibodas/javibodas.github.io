const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: 'styles.min.css',
  })],
  module: {
    rules: [
      {
        test: /\.(png|jpeg|ttf|...)$/,
        use: [
          { loader: 'url-loader' } 
          ]
        },
        {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
};