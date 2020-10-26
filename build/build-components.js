const components = require('./get-component')()
const compilerJs = require('./compilerJs')
components.forEach(compilerJs)
