const fs = require('fs-extra')
const path = require('path')

const baseExcludes = [
  'dynamic-import',
  'frequently-qa',
  'principle',
  'style',
  '.DS_Store',
]

const hasStyleExcludes = [
  'utils',
  'composables',
  'locale',
  'bem',
  'dynamic-import',
  'frequently-qa',
  'principle',
]

module.exports = function (excludesType, targetDir) {
  let excludes
  if (!excludesType) {
    excludes = baseExcludes
  } else if (excludesType === 'style') {
    excludes = baseExcludes.concat(hasStyleExcludes)
  }
  let dirs = []
  if(targetDir) {
    dirs = fs.readdirSync(targetDir)
  } else {
    dirs = fs.readdirSync(path.resolve(__dirname, '../packages'))
  }
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}

