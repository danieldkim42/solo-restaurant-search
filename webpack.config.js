const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader',{loader: 'css-loader', options: {
          importLoaders: 1,
          modules: true,
        }}]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Development',
    template: 'index.html'
  })],
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist') 
    }
  }
};

// /\.(s(a|c)ss)$/