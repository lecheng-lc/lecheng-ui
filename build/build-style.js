const components = require('./get-component')('style')
const { compilerCss, checkComponentHasStyle, commonStyle } = require('./compilerCss')

components.forEach(name => {
  if (checkComponentHasStyle(name)) {
    compilerCss(name)
  }
})

commonStyle()

