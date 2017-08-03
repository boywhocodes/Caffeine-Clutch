var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./js_lib/caffeine_clutch.js",
  output: {
    path: path.resolve(__dirname, 'js_lib'),
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
