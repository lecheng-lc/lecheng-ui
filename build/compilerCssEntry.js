const dependencyTree = require('dependency-tree')
const path = require('path')
const fs = require('fs-extra')
const whiteList = ['popup']
const {getTargetDir} = require('./common')
const emptyStyleComponents = [
  'bem',
  'composables',
  'dynamic-import',
  'frequently-qa',
  'principle',
  'utils',
  'locale'
]

function getComponentNameFromPath(file) {
  let last = file.lastIndexOf('/')
  file = file.substr(0, last)
  last = file.lastIndexOf('/')
  return file.substr(last + 1)
}
/**
 * @description 获取依赖
 * @param {*} component
 * @returns
 */
function getDependence(component) {
  const result = [component]
  const libPath = getTargetDir()
  const components = require('./get-component')('style')
  const checkList = whiteList.concat(components)
  const directory = path.resolve(__dirname, libPath)
  const filename = path.join(directory, component, 'index.js')
  const dependence = dependencyTree({
    directory,
    filename,
    filter: path => !~path.indexOf('node_modules')
  })
  const search = (obj) => {
    Object.keys(obj).forEach(file => {
      const name = getComponentNameFromPath(file)
      if (checkList.some(x => x === name)) {
        if (whiteList.every(x => x !== name)) {
          result.push(name)
        }
        obj[file] && search(obj[file])
      }
    })
  }
  console.log('我看下result', filename)
  search(dependence[filename])
  return result
}

module.exports = function writeStyle(component) {
  const libPath = getTargetDir()
  // 收集依赖
  const styleArr = [...new Set(getDependence(component))]
  const componentPath = path.resolve(__dirname, libPath, component, 'style/index.js')
  if (emptyStyleComponents.some(x => x === component)) {
    fs.ensureFileSync(path.resolve(__dirname, libPath, component, 'index.css'))
  }
  // console.log(componentPath,'][]]')
  let expression = ''
  if(process.env.MODULE_ENV !== 'ES') {
    expression = styleArr.map(x =>
      `require("${component === x ? '../index.css' : `../../${x}/index.css`}")`
    ).join('\n')
  } else {
    expression = styleArr.map(x =>
      `import "${component === x ? '../index.css' : `../../${x}/index.css`}"`
    ).join('\n')
  }

  fs.outputFileSync(componentPath, expression)
  // }
}
