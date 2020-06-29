const fs = require('fs-extra')
const path = require('path')

const baseExcludes = [
  'style',
  '.DS_Store'
]

const hasStyleExcludes = [
  'mixins',
  'utils'
]

module.exports = function (excludesType) {
  let excludes
  if (excludesType === undefined) {
    excludes = baseExcludes
  } else if (excludesType === 'style') {
    excludes = baseExcludes.concat(hasStyleExcludes)
  }

  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}

