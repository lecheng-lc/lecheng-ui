const stylus = require('stylus')
const path = require('path')
const { readFileSync, readdirSync } = require('fs')
const fs = require('fs-extra')
const CleanCSS = require('clean-css')
const srcPath = path.join(__dirname, '../packages')
const libPath = path.join(__dirname, '../lib')
const getStylePath = name => path.join(srcPath, name, 'index.styl')

exports.checkComponentHasStyle = function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component))
}

exports.compilerCss = function compilerCss(name) {
  const stylusString = readFileSync(getStylePath(name), 'utf8')

  stylus(stylusString)
  // .set('filename', 'nesting.css')
    .include(path.join(srcPath, 'style'))
    .render(function(err, css){
      if (err) throw err
      console.log(`编译 ${name}/index.styl`)
      fs.outputFileSync(path.join(libPath, name, 'index.css'), new CleanCSS().minify(css).styles)
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
