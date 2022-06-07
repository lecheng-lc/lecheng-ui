const components = require('./get-component')('style')
const writeStyle = require('./compilerCssEntry')

function buildStyleEntry() {
  components.forEach(writeStyle)
}
module.exports = {
  buildStyleEntry
}
