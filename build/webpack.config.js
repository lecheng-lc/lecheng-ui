const path = require('path')
const lib = path.resolve(__dirname, '../lib')
const es = path.resolve(__dirname, '../packages')
const jsPath = path.join(es, 'index.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: jsPath,
  output: {
    filename: 'index.js',
    path: lib,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              // publicPath: './'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'index.css'
  })],
  externals: {
    vue: 'Vue'
  }
}
