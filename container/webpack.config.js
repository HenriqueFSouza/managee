const path = require('path');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  entry: './src/index.ts',
  output: {
    publicPath: argv.mode === "development"  ? "http://localhost:3000/" : "https://managee-mf-container.onrender.com/",
    filename: 'bundle.js', // Nome do arquivo JavaScript gerado
    path: path.resolve(__dirname, 'dist'), // Pasta de saída
    publicPath: '/', // Caminho público para assets
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
        use: ["style-loader", "css-loader", "postcss-loader"],
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
        dashboard: "mf_admin@https://managee-mf-admin.onrender.com/remoteEntry.js",
        meus_eventos: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        criar_evento: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        editar_evento: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        detalhes_evento: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        inscricao_evento: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        confimacao_inscricao: "mf_event@https://managee-mf-event.onrender.com/remoteEntry.js",
        hooks: "container@https://managee-mf-container.onrender.com/remoteEntry.js"
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
   new Dotenv()
  ],
});
