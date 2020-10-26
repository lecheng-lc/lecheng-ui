const name = process.argv[2]
const compilerJs = require('./compilerJs')
const { compilerCss, checkComponentHasStyle } = require('./compilerCss')
const compilerCssEntry = require('./compilerCssEntry')

if (!name) {
  console.log('请输入组件名')
  process.exit(0)
}
compilerJs(name)
if (checkComponentHasStyle(name)) {
  compilerCss(name)
}
compilerCssEntry(name)
