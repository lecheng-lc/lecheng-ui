const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const components = require('./get-component')('style')
const libPath = path.resolve(__dirname, '../lib/')

const extractDecoratorFileName = 'extract-decorator'
const extractFile = path.join(libPath, 'utils', `${extractDecoratorFileName}.js`)
const decoratorCode = new RegExp('(function _decorate[\\S\\s]+return \\(hint === "string" \\? String : Number\\)\\(input\\); \\})')
const decoratorDependenceTypeof = /(var _extends2[\s\S]+typeof"\)\);)/
const decoratorDependenceArray = /(var _toArray2[\s\S]+toArray"\)\);)/

const replaceImportCode = `/* decorator auto extract */ 
var _decorate = require("../utils/${extractDecoratorFileName}")`

let hasExtractFile = false
let hasAddHelper = false

function extract(file) {
  if (!fse.pathExistsSync(file)) {
    throw `${file} 不存在`
  }

  let content = fs.readFileSync(file, 'utf8')
  content = content.replace(decoratorCode, (str, mat) => {
    if (!hasExtractFile) {
      console.log(`${extractDecoratorFileName}.js 不存在，自动注入`)
      fse.outputFileSync(extractFile, `${mat} \n\nmodule.exports = _decorate`)
      hasExtractFile = true
    }
    if (mat) {
      console.log(`提取 ${file.replace(libPath, '').replace('/index.js', '')} 中的 decorator`)
      return replaceImportCode
    }
    return mat
  })
  content = content.replace(decoratorDependenceTypeof, (a, b) => {
    if (!hasAddHelper) {
      const ex = fs.readFileSync(extractFile, 'utf8')
      fse.outputFileSync(extractFile, b + '\n\n' + ex)
    }
    if (b) {
      console.log('     /* remove typeof and extends */')
      return '/* remove typeof and extends */'
    }
    return b
  })
  content = content.replace(decoratorDependenceArray, (a, b) => {
    if (!hasAddHelper) {
      const ex = fs.readFileSync(extractFile, 'utf8')
      fse.outputFileSync(extractFile, b + '\n\n' + ex)
      hasAddHelper = true
    }
    if (b) {
      console.log('     /* remove toArray */')
      return '/* remove toArray */'
    }
    return b
  })
  fse.outputFileSync(file, content)
}

components.forEach(name => {
  extract(path.resolve(__dirname, '../lib', name, 'index.js'))
})
