const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
  entry: {
    app: ['./src/js/app.js', './src/sass/app.scss']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
        })
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('lost')(),
        ]
      }
    }),
    extractCSS
  ],
  devServer: {
    inline: true,
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  }
}
