import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin, { loader as _loader } from "mini-css-extract-plugin";

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

export const mode = isProduction ? "production" : "development";
export const devtool = isProduction ? "source-map" : "eval-source-map";
export const entry = "./src/index.jsx";
export const output = {
  // eslint-disable-next-line no-undef
  path: _resolve(__dirname, "dist"),
  filename: "bundle.js",
  clean: true,
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
      test: /\.s[ac]ss$/i,
      use: [
        isProduction ? _loader : "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      type: "asset/resource",
      generator: {
        filename: "assets/[name][ext]",
      },
    },
  ],
};
export const resolve = {
  extensions: [".js", ".jsx"],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
  }),
];
export const devServer = {
  static: {
    // eslint-disable-next-line no-undef
    directory: _resolve(__dirname, "dist"),
  },
  port: 3000,
  hot: true,
  historyApiFallback: true,
};
