const fs = require('fs-extra')
const path = require('path')
const getComponent = require('./get-component')

const components = getComponent('style').filter(x => !['saas-utils', 'bem', 'sentry'].includes(x))

let umdImportString = 'import Vue from \'vue\'\n'

for (const name of components) {
  umdImportString += `import ${upperPascal(name)} from '../lib/${name}/index.js'\n`
}

umdImportString += `\n`
for (const name of components) {
  umdImportString += `require('../lib/${name}/style/index.js')\n`
}

umdImportString += `\n`
for (const name of components) {
  umdImportString += `Vue.component('${name}', ${upperPascal(name)})\n`
}

function upperPascal (str) {
  return str.split('-').map(x => `${x[0].toUpperCase()}${x.substr(1)}`).join('')
}

fs.outputFileSync(path.resolve(__dirname, '../packages/index.js'), umdImportString)
