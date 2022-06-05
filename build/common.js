
const path = require('path')
const fs = require('fs')
const { outputFileSync ,readFileSync} = require('fs-extra')
function smartOutputFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8');

    if (previousContent === content) {
      return;
    }
  }
  outputFileSync(filePath, content);
}
const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}
function pascalize(str) {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  );
}
function normalizePath(path) {
  return path.replace(/\\/g, '/');
}
function findRootDir(dir) {
  if (dir === '/') {
    return '/';
  }
  return findRootDir(path.dirname(dir));
}
function getPackageJson() {
  delete require.cache[PACKAGE_JSON_FILE]
  return require(PACKAGE_JSON_FILE);
}
const ROOT = process.cwd()
// const ROOT = findRootDir(CWD)
const PACKAGE_JSON_FILE = path.join(ROOT, 'package.json')
const ES_DIR = path.join(__dirname, '../es')
const LIB_DIR = path.join(__dirname, '../lib')
const SRC_DIR = path.join(__dirname, '../packages')

module.exports = {
  MODULE_ENV: process.env.MODULE_ENV,
  smartOutputFile,
  pascalize,
  normalizePath,
  PACKAGE_JSON_FILE,
  getPackageJson,
  ES_DIR,
  LIB_DIR,
  SRC_DIR
}
