const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  output: {
    publicPath: argv.mode === "development"  ? "http://localhost:3000/" : "https://managee-mf-container.onrender.com/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        dashboard: "mf_admin@http://localhost:3003/remoteEntry.js",
        meus_eventos: "mf_event@http://localhost:3002/remoteEntry.js",
        criar_evento: "mf_event@http://localhost:3002/remoteEntry.js",
        editar_evento: "mf_event@http://localhost:3002/remoteEntry.js",
        detalhes_evento: "mf_event@http://localhost:3002/remoteEntry.js",
        inscricao_evento: "mf_event@http://localhost:3002/remoteEntry.js",
        confimacao_inscricao: "mf_event@http://localhost:3002/remoteEntry.js",
        hooks: "container@http://localhost:3000/remoteEntry.js"
      },
      exposes: {
        "./UserContext": "./src/hooks/UserContext"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        }
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
});
