const execa = require('execa')
const path = require('path')
const { relative } = require('path')
const { copy, existsSync,remove, } = require('fs-extra')
const { ES_DIR, LIB_DIR, SRC_DIR,isDir, isDemoDir,isTestDir} = require('./common')
const genPackageEntry = require('./package-entry')
const { genPacakgeStyle } = require('./gen-package-style')
const compileJs = require('./compilerJs')
const { compilerSingleCss } = require('./compilerCss')
const components = require('./get-component')
const {buildStyle} = require('./build-style')
const {buildStyleEntry} = require('./build-style-entry')
execa.sync('rm',['-rf','./lib','./es'])
const esEntryFile = path.join(ES_DIR, 'index.js');

async function copySourceCode() {
  return Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)]);
}
async function compileDir(dir, format) {
  const targetComponents = components('', dir)
  targetComponents.forEach(compileJs);
}
 async function preCompileDir(dir) {
  const files = components('', dir)
  await Promise.all(files.map((filename) => {
      const filePath = path.join(dir, filename);
      if (isDemoDir(filePath) || isTestDir(filePath)) {
          return remove(filePath);
      }
      if (isDir(filePath)) {
          return preCompileDir(filePath);
      }
      // if (isSfc(filePath)) {
      //     return compileSfc(filePath);
      // }
      return Promise.resolve();
  }));
}
async function buildESMOutputs() {
  await compileDir(ES_DIR, 'esm')
}
async function buildCJSOutputs() {
  await compileDir(LIB_DIR, 'cjs')
}
async function buildTypeDeclarations() {
  await Promise.all([preCompileDir(ES_DIR),preCompileDir(LIB_DIR)]);
  const tsConfig = path.join(process.cwd(), './tsconfig.declaration.json');
  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}
async function buildPacakgeEntry() {
  const libEntryFile = path.join(LIB_DIR, 'index.js');
  const styleEntryFile = path.join(LIB_DIR, `index.styl`);
  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path) => `./${relative(SRC_DIR, path)}`,
  })
  await copy(esEntryFile, libEntryFile)
  await genPacakgeStyle()
  await compilerSingleCss(styleEntryFile)
}
async function runRunEs() {
  process.env.MODULE_ENV = 'ES'
  await buildESMOutputs()
  await buildStyle()
}
async function runRunCJS() {
  process.env.MODULE_ENV = 'commonjs'
  await buildCJSOutputs()
  await buildStyle()
}
async function runTask() {
  await copySourceCode()
  await buildPacakgeEntry()
  await buildTypeDeclarations()
  // 执行ES代码
  await runRunEs()
  await runRunCJS()
  await buildStyleEntry()
  const libEntryFile = path.join(LIB_DIR, 'index.js');
  await compileJs(libEntryFile)
  execa.sync('yarn', ['build:umd'],{
    stdio: ['inherit', 'inherit', 'pipe']
  })
}
runTask()








