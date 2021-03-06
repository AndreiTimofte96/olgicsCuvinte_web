const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    if (extension === 'html')
      return new HtmlWebpackPlugin({
        hash: true,
        filename: `${name}.html`,
        chunks: [name],
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: 'body'
      });
  }).filter((e) => e !== undefined);
}

const htmlPlugins = generateHtmlPlugins('./src/')

module.exports = {
  mode: 'development',
  devtool: 'inline-sourcemap',
  context: __dirname,
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader //'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ].concat(htmlPlugins)
}
    