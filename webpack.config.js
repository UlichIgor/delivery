import { resolve as resolvePath, join, dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  mode: "development",
  devtool: "source-map",
  context: resolvePath(__dirname, "src"),
  entry: {
    main: resolvePath(__dirname, "src/index.jsx"),
  },
  output: {
    path: resolvePath(__dirname, "build"),
    filename: "[name].js",
    clean: true,
  },
  devServer: {
    static: {
      directory: join(__dirname, "build"),
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
    new HtmlWebpackPlugin({
      template: resolvePath(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
    alias: {
      "@": resolvePath(__dirname, "src/components"),
    },
  },
  module: {
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};

export default config;
