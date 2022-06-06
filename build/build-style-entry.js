const components = require('./get-component')('style')
const writeStyle = require('./compilerCssEntry')

function buildEntry() {
  components.forEach(writeStyle)
}
module.exports = {
  buildEntry
}
