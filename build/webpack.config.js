const path = require('path')
const lib = path.resolve(__dirname, '../lib')
const jsPath = path.join(lib, 'index.js')

module.exports = {
  entry: jsPath,
  output: {
    library: 'lc-ui',
    filename: 'lc-ui.js',
    path: lib,
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'Vue'
  }
}
