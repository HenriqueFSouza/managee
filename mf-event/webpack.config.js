const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: argv.mode === "development" ? "http://localhost:3002/": "https://managee-mf-event.onrender.com",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
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
      name: "mf_event",
      filename: "remoteEntry.js",
      remotes: {
        hooks: "container@https://managee-mf-container.onrender.com/remoteEntry.js"
      },
      exposes: {
        './CreateEvent': './src/pages/CreateEvent.tsx',
        './EditEvent': './src/pages/EditEvent.tsx',
        './EventDetails': './src/pages/EventDetails.tsx',
        './MyEvents': './src/pages/MyEvents.tsx',
        './EventSubscribe': './src/pages/EventSubscribe.tsx',
        './SubscribeConfirmation': './src/pages/SubscribeConfirmation.tsx'
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
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
