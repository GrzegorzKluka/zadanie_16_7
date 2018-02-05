const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')

const env = process.env.NODE_ENV || 'development'

const base = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
}

const production = () => {
  return Object.assign({}, base, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new OptimizeJsPlugin({
        sourceMap: false,
      }),
      ...base.plugins,
    ],
  })
}
const development = () => {
  return Object.assign({}, base, {
    entry: ['react-hot-loader/patch', ...base.entry],
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      ...base.plugins,
    ],
  })
}

module.exports = () => {
  if (env === 'production') {
    return production()
  } else {
    return development()
  }
}

