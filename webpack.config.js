/* eslint-env node */
const { resolve } = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const projectRoot = __dirname;
const { homepage = "" } = require("./package.json");

module.exports = (_env, argv = {}) => {
  const mode = argv.mode || "development";
  const publicUrl = (
    process.env.PUBLIC_URL ||
    (mode === "production" ? homepage.trim() : "")
  ).replace(/\/$/, "");

  return {
    mode,
    devtool: mode === "development" ? "source-map" : false,
    context: resolve(projectRoot, "src"),
    entry: resolve(projectRoot, "src/index.jsx"),
    output: {
      path: resolve(projectRoot, "build"),
      filename: "[name].js",
      publicPath: publicUrl ? `${publicUrl}/` : "/",
      clean: true,
    },
    devServer: {
      static: {
        directory: resolve(projectRoot, "build"),
      },
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    performance: {
      hints: "warning",
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: [
      new DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify(publicUrl),
      }),
      new HtmlWebpackPlugin({
        template: resolve(projectRoot, "public/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "style.[contenthash].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(projectRoot, "public"),
            to: ".",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(projectRoot, "src/components"),
      },
      extensions: [".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
