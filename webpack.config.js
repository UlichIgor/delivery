/* eslint-env node */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  bail: true,
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  context: path.resolve(__dirname, "src"),
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext][query]",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern",
              sassOptions: {
                loadPaths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "static/media/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: "body",
      favicon: path.resolve(__dirname, "public/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? "static/css/[name].[contenthash:8].css" : "static/css/[name].css",
      chunkFilename: isProduction
        ? "static/css/[name].[contenthash:8].chunk.css"
        : "static/css/[name].chunk.css",
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
      watch: true,
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    client: {
      overlay: true,
    },
  },
  performance: {
    hints: isProduction ? "warning" : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
