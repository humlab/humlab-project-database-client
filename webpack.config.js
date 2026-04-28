const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/js/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/stylesheets"),
          to: "stylesheets",
        },
        {
          from: path.resolve(__dirname, "src/assets"),
          to: "assets",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "exported-data"),
          to: "exported-data",
        },
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        directory: path.resolve(__dirname, "src"),
      },
      {
        directory: path.resolve(__dirname, "exported-data"),
        publicPath: "/exported-data",
      },
    ],
    port: 8080,
    hot: true,
    open: true,
  },
  devtool: "source-map",
};
