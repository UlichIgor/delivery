import { resolve } from "path";
import { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin, { loader as _loader } from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MinimizerPlugin from "minimizer-webpack-plugin";

// eslint-disable-next-line no-undef
const projectRoot = __dirname;
import _package from "./package.json";
const { homepage = "" } = _package;

export default (_env, argv = {}) => {
  const mode = argv.mode || "development";
  const publicUrl = (
    // eslint-disable-next-line no-undef
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
      new MinimizerPlugin({
        minimizerOptions: {
          compress: {
            drop_console: true,
          },
        },
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
          use: [_loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
