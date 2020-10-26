const components = require('./get-component')('style')
const writeStyle = require('./compilerCssEntry')
components.forEach(writeStyle)
