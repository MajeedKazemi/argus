const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const config = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,        
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        template: "./src/index.html",
        filename: "./index.html",
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;