const stylus = require('stylus')
const path = require('path')
const { readFileSync, readdirSync } = require('fs')
const fs = require('fs-extra')
const { getTargetDir } = require('./common')
const CleanCSS = require('clean-css')
const getStylePath = name => path.join(getTargetDir(), name, 'index.styl')
exports.checkComponentHasStyle = function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component))
}

exports.compilerCss = function compilerCss(name) {
  const stylusString = readFileSync(getStylePath(name), 'utf8')
  const srcPath = getTargetDir()
  stylus(stylusString)
    .include(path.join(srcPath,'./style'))
    .render(function (err, css) {
      if (err) throw err
      // console.log(`编译 ${name}/index.styl`)
      fs.outputFileSync(path.join(srcPath, name, 'index.css'), new CleanCSS().minify(css).styles)
    })
}
exports.compilerSingleCss = function compilerSingleCss(url, name = 'lib') {
    const stylusString = readFileSync(url, 'utf8')
    const srcPath = getTargetDir()
    const root = path.join(srcPath)
    stylus(stylusString)
      .set('paths', [root])
      .render(function (err, css) {
        if (err) throw err
        console.log(`编译 ${name}/index.styl`)
        fs.outputFileSync(path.join(srcPath, 'index.css'), new CleanCSS().minify(css).styles)
      })
  }
exports.commonStyle = function () {
  const srcPath = getTargetDir()
  const root = path.join(srcPath, 'style')
  readdirSync(root).forEach(file => {
    stylus(readFileSync(path.join(root, file), 'utf8'))
      .set('paths', [root])
      .render((err, css) => {
        if (err) throw err
        if (css) {
          console.log(`编译 style/${file}`)
          fs.outputFileSync(path.join(srcPath, 'style', file.replace('.styl', '.css')), new CleanCSS().minify(css).styles)
        }
      })
  })
}
