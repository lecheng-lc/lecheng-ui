const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const { MODULE_ENV ,isAsset,isStyle} = require('./common')
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
process.env.MODULE_ENV = 'ES'

console.log(process.env.MODULE_ENV,'=====')
const srcPath = path.resolve(__dirname, MODULE_ENV === 'ES' ? '../es' : '../lib')
module.exports = function compilerJs(dir) {
  let files = []
  dir = /^\//.test(dir) ? dir : path.join(srcPath, dir)
  if (isDir(dir)) {
    files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      // scan dir and not demo
      if (isDir(filePath)) {
        return compilerJs(filePath)
      }
      if (filePath.includes('.d.ts')) {
        return;
      }
      // compile js or ts
      if (isScript(file)) {
        const { code } = babel.transformFileSync(filePath, babelConfig)
        fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code)
        fs.removeSync(filePath)
      }
      else if(!isAsset(filePath) && !isStyle(filePath)){
        fs.removeSync(filePath)
      }
    })
  } else {
    if (isScript(dir)) {
      const { code } = babel.transformFileSync(dir, babelConfig)
      fs.outputFileSync(dir.replace(scriptRegExp, '.js'), code)
      // fs.removeSync(filePath)
    }
  }


}
