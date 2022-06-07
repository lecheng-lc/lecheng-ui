
const path = require('path')
const {sep} = require('path')
const fs = require('fs')
const { outputFileSync ,lstatSync,readFileSync} = require('fs-extra')
const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$'); // 获取src下面的demo文件夹，用来展示demo
const TEST_REGEXP = new RegExp('\\' + sep + 'test$'); // 获取test下面的，用来做测试处理
const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i; // 用来匹配图片静态资源路径
const STYLE_REGEXP = /\.(css|less|scss|styl)$/; //获取CSS类型
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
function getTargetDir(url) {
  return  path.resolve(url || __dirname, process.env.MODULE_ENV === 'ES' ? '../es' : '../lib')
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
const isDemoDir = (dir) => DEMO_REGEXP.test(dir); // 是否是组件下面的demo目录
const isDir = (dir) => lstatSync(dir).isDirectory(); // 是否是文件夹
const isTestDir = (dir) => TEST_REGEXP.test(dir); // 是否是组件下面的test目录
const isAsset = (path) => ASSET_REGEXP.test(path); // 是否是静态资源图片类型文件
const isStyle = (path) => STYLE_REGEXP.test(path); // 是否是style样式文件

module.exports = {
  smartOutputFile,
  pascalize,
  normalizePath,
  PACKAGE_JSON_FILE,
  getPackageJson,
  ES_DIR,
  LIB_DIR,
  SRC_DIR,
  getTargetDir,
  isDemoDir,
  isDir,
  isTestDir,
  isAsset,
  isStyle
}
