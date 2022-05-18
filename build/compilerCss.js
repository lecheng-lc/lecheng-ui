const stylus = require('stylus')
const path = require('path')
const { readFileSync, readdirSync } = require('fs')
const fs = require('fs-extra')
const { MODULE_ENV } = require('./common')
const CleanCSS = require('clean-css')
const srcPath = path.join(__dirname, '../packages')
const libPath = path.join(__dirname, MODULE_ENV === 'ES' ? '../es' : '../lib')
const getStylePath = name => path.join(srcPath, name, 'index.styl')

exports.checkComponentHasStyle = function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component))
}

exports.compilerCss = function compilerCss(name) {
  const stylusString = readFileSync(getStylePath(name), 'utf8')
  stylus(stylusString)
    .include(path.join(srcPath,'./style'))
    .render(function (err, css) {
      if (err) throw err
      console.log(`编译 ${name}/index.styl`)
      fs.outputFileSync(path.join(libPath, name, 'index.css'), new CleanCSS().minify(css).styles)
    })
}
exports.compilerSingleCss = function compilerSingleCss(url, name = 'lib') {
    const stylusString = readFileSync(url, 'utf8')
    const root = path.join(srcPath)
    stylus(stylusString)
      .set('paths', [root])
      .render(function (err, css) {
        if (err) throw err
        console.log(`编译 ${name}/index.styl`)
        fs.outputFileSync(path.join(libPath, 'index.css'), new CleanCSS().minify(css).styles)
      })
  }
exports.commonStyle = function () {
  const root = path.join(srcPath, 'style')
  readdirSync(root).forEach(file => {
    stylus(readFileSync(path.join(root, file), 'utf8'))
      .set('paths', [root])
      .render((err, css) => {
        if (err) throw err
        if (css) {
          console.log(`编译 style/${file}`)
          fs.outputFileSync(path.join(libPath, 'style', file.replace('.styl', '.css')), new CleanCSS().minify(css).styles)
        }
      })
  })
}
