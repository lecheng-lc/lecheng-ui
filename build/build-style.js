const components = require('./get-component')('style')
const { compilerCss, checkComponentHasStyle, commonStyle } = require('./compilerCss')
async function buildStyle(){
  components.forEach(name => {
    if (checkComponentHasStyle(name)) {
      compilerCss(name)
    }
  })
  commonStyle()
}
module.exports = {
  buildStyle
}


