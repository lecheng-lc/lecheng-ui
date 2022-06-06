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
const {buildEntry} = require('./build-style-entry')
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
async function buildTypeDeclarations() {
  await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)]);
  const tsConfig = path.join(process.cwd(), './tsconfig.declaration.json');
  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}

async function gogo() {
  await copySourceCode()
  await buildTypeDeclarations()
  await buildESMOutputs()
  await buildStyle()
  await buildEntry()
  await buildPacakgeEntry()
}
gogo()
async function buildPacakgeEntry() {
  const libEntryFile = path.join(LIB_DIR, 'index.js');
  const styleEntryFile = path.join(LIB_DIR, `index.styl`);
  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path) => `./${relative(ES_DIR, path)}`,
  })
  await copy(esEntryFile, libEntryFile)
  await compileJs(libEntryFile)
  await genPacakgeStyle()
  execa.sync('yarn', ['build:umd'],{
    stdio: ['inherit', 'inherit', 'pipe']
  })
  await compilerSingleCss(styleEntryFile)
}




