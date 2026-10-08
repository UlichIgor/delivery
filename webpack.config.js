const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  bail: true,
  mode: 'development',
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
  },
  devServer: {
    compress: true,
    open: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    aliasFields: ['browser'],
    alias: {
      '@': path.resolve(__dirname, 'src/components')
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|sa|c)ss/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'src','scss')],
      },
      {
        test: /\.md$/i,
        use: ['html-loader', 'markdown-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /.(gif|png|jpe?g|webp)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              webp: {
                quality: 80
              }
            }
          }
        ]
      },
    ]
  },

};