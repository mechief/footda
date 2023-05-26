const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');

dotenv.config();

// const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'Footda-setting',
  mode: 'development', // 서비스: production
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
        plugins: [
          // 'react-refresh/babel',
        ],
      }
    }],
  },

  plugins: [
    // new RefreshWebpackPlugin(), // API 사용 횟수 때문에 임시로 중단
    new webpack.DefinePlugin({
      'process.env.FOOTDA_API_URL': JSON.stringify(process.env.FOOTDA_API_URL),
      'process.env.FOOTBALL_API_HOST_KEY': JSON.stringify(process.env.FOOTBALL_API_HOST_KEY),
    }),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  }, // 출력

  devServer: {
		// react-router를 통한 링크를 새로고침으로 접근했을때 없는 주소로 나오는 문제 해결
		historyApiFallback: true,
    // 빌드된 파일이 들어갈 위치
    devMiddleware: { 
      publicPath: '/dist',
    },
    // 정적 파일 index.html의 위치
    static: {
      directory: path.resolve(__dirname),
    },
    port: 9000,
    hot: false,
    liveReload: false,
  },
};