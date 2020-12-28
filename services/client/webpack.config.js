const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      react: path.resolve("./node_modules/react")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    })
  ]
}
