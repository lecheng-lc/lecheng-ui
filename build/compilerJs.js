const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const {MODULE_ENV} = require('./common')
const babelConfig = { // babel配置
  configFile: path.join(__dirname, './babel.config.js')
}
const scriptRegExp = /\.(js|ts|tsx)$/  // 匹配是否是JS文件
const isDir = dir => {
  if (fs.lstatSync(dir).isDirectory()) {
    const dirTree = dir.split('/')
    const lastFileName = dirTree[dirTree.length - 1]
    return lastFileName && lastFileName.toLowerCase() !== 'demo'
  }
}
// const isCode = path => !/(demo|test|\.md)$/.test(path)
const isScript = path => scriptRegExp.test(path)
const srcPath = path.resolve(__dirname, '../packages')
module.exports = function compilerJs(dir) {
  dir = /^\//.test(dir) ? dir : path.join(srcPath, dir)
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const fileLibPath = filePath.replace('/packages/', MODULE_ENV ==='ES' ? '/es/' : '/lib/')
    // remove unnecessary files
    // if (!isCode(file)) {
    //   return fs.removeSync(filePath);
    // }

    // scan dir and not demo
    if (isDir(filePath)) {
      return compilerJs(filePath)
    }

    // compile js or ts
    if (isScript(file)) {
      console.log(`打包 ${filePath.replace(srcPath, '')}`)
      const { code } = babel.transformFileSync(filePath, babelConfig)
      fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), code)
    }
  })
}
