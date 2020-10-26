const dependencyTree = require('dependency-tree')
const path = require('path')
const fs = require('fs-extra')
const whiteList = ['popup']
const emptyStyleComponents = [
  'bem',
  'http',
  'dot',
  'sentry',
  'saas-utils',
  'utils'
]

function getComponentNameFromPath(file) {
  let last = file.lastIndexOf('/')
  file = file.substr(0, last)
  last = file.lastIndexOf('/')
  return file.substr(last + 1)
}

function getDependence(component) {
  const result = [component]
  const components = require('./get-component')('style')
  const checkList = whiteList.concat(components)
  const directory = path.resolve(__dirname, '../lib')
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
  search(dependence[filename])
  return result
}

module.exports = function writeStyle(component) {
  // 收集依赖
  const styleArr = [...new Set(getDependence(component))]
  const componentPath = path.resolve(__dirname, '../lib', component, 'style/index.js')
  if (emptyStyleComponents.some(x => x === component)) {
    // fs.ensureFileSync(componentPath)
    fs.ensureFileSync(path.resolve(__dirname, '../lib', component, 'index.css'))
  }
  const expression = styleArr.map(x =>
    `require("${component === x ? '../index.css' : `../../${x}/index.css`}")`
  ).join('\n')
  console.log(`组件 ${component} 注入依赖样式 ${styleArr.join('/')}`)
  fs.outputFileSync(componentPath, expression)
  // }
}
