const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    publicPath: "auto",
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@shared": path.resolve(__dirname, "../../shared")
    }
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
    static: path.resolve(__dirname, "public"),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-react", { runtime: "automatic" }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "pedido",
      filename: "remoteEntry.js",
      exposes: {
        "./OrderApp": "./src/App"
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    })
  ]
};
