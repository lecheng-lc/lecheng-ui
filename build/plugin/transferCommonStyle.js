const { addSideEffect } = require('@babel/helper-module-imports')

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: {
        exit(path) {
          const { value } = path.node.source
          if (/^\.\.\/style\/[a-zA-Z]+\.styl$/.test(value)) {
            addSideEffect(path, value.replace('.styl', '.css'))
            path.remove()
          }
        }
      }
    }
  }
}
