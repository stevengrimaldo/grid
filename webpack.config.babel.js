import webpack from 'webpack';
import path from 'path';

// Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';

// Postcss
import lineheightconversion from 'postcss-line-height-px-to-unitless';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import lost from 'lost';

export default {
  context: path.resolve(__dirname, './src/js'),
  entry: {
    app: './app'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './build/js'),
    publicPath: './build/js'
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              lineheightconversion(),
              lost(),
              cssnext({
                browsers: 'last 2 versions'
              }),
              cssnano({
                autoprefixer: false,
                mergeRules: false,
                zindex: false
              })
            ]
          }
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: '../css/[name].min.css',
      allChunks: true
    }),
    new StyleLintPlugin({
      context: './src/scss',
      syntax: 'scss'
    }),
    new CopyWebpackPlugin([{
      from: '../media/',
      to: '../media/'
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80'
      },
      jpegtran: {
        progressive: true
      },
      svgo: {
        removeViewBox: true
      }
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './src')
  }
};
