import { resolve as _resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin, { loader as _loader } from "mini-css-extract-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
export const mode = "development";
export const devtool = "source-map";
export const context = _resolve(__dirname, "src");
export const entry = {
  main: _resolve(__dirname, "src/index.jsx"),
};
export const output = {
  path: _resolve(__dirname, "build"),
  filename: "[name].js",
  clean: true,
};
export const devServer = {
  static: {
    directory: join(__dirname, "build"),
  },
  compress: true,
  hot: true,
  open: true,
  historyApiFallback: true,
};
export const performance = {
  hints: "warning",
  maxEntrypointSize: 512000,
  maxAssetSize: 512000,
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: _resolve(__dirname, "public/index.html"),
    filename: "index.html",
  }),
  new MiniCssExtractPlugin({
    filename: "style.[contenthash].css",
  }),
];
export const resolve = {
  modules: ["node_modules"],
  extensions: [".js", ".jsx", ".json", ".css", ".scss"],
  alias: {
    "@": _resolve(__dirname, "src/components"),
  },
};
export const module = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
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
};
