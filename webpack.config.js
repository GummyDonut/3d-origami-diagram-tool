const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev')

const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    bundle: path.join(dirApp, 'editor')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),
    new webpack.ProvidePlugin({
      paper: 'paper'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs')
    })
  ],

  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
          sourceMap: IS_DEV
        }
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },

      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },

      // HTML
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }

      // JQuery exposer
      // does not work with webpack 4 https://github.com/webpack-contrib/expose-loader/issues/77
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: '$'
      //   },
      //   {
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   }
      //   ]
      // }
    ]
  }
}
