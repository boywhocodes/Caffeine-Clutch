var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./lib/caffeine_clutch.js",
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: "./lib/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
