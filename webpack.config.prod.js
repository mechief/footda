const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  name: 'Footda-setting',
  mode: 'production',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: [
      './src/client',
    ]
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 3% in KR', 'last 2 chrome versions', 'not dead'], // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
      }
    }],
  },

  plugins: [
    new Dotenv(),
    // Copy assets dir to dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
      ],
    }),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  }, // 출력
};