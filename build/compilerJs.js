const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const { MODULE_ENV } = require('./common')
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
  let files = []
  dir = /^\//.test(dir) ? dir : path.join(srcPath, dir)
  if (isDir(dir)) {
    files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const fileLibPath = filePath.replace('/packages/', MODULE_ENV === 'ES' ? '/es/' : '/lib/')
      // scan dir and not demo
      if (isDir(filePath)) {
        return compilerJs(filePath)
      }
      // compile js or ts
      if (isScript(file)) {
        const { code } = babel.transformFileSync(filePath, babelConfig)
        fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), code)
      }
    })
  } else {
    if (isScript(dir)) {
      const { code } = babel.transformFileSync(dir, babelConfig)
      fs.outputFileSync(dir.replace(scriptRegExp, '.js'), code)
    }
  }


}
