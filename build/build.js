const execa = require('execa')
const path = require('path')
const { relative } = require('path')
const { copy, existsSync } = require('fs-extra')
const { ES_DIR, LIB_DIR, SRC_DIR } = require('./common')
const genPackageEntry = require('./package-entry')
const { genPacakgeStyle } = require('./gen-package-style')
const compileJs = require('./compilerJs')
const { compilerSingleCss } = require('./compilerCss')
const components = require('./get-component')


// execa.sync('rm',['-rf','./lib','./es'])
process.env.MODULE_ENV = 'ES'
// execa.sync('yarn', ['compile'],{
//   stdio: ['inherit', 'inherit', 'pipe']
// })
// process.env.MODULE_ENV = 'LIB'
// execa.sync('yarn', ['compile'],{
//   stdio: ['inherit', 'inherit', 'pipe']
// })

async function copySourceCode() {
  return Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)]);
}
async function compileDir(dir, format) {
  const targetComponents = components('', dir)
  console.log(targetComponents)
  console.log(888777)
  targetComponents.forEach(compileJs);
}
async function buildESMOutputs() {
  await compileDir(ES_DIR, 'esm')
}
async function buildTypeDeclarations() {
  // await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)]);
  const tsConfig = path.join(process.cwd(), './tsconfig.declaration.json');
  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}
async function gogo() {
  await copySourceCode()
  await buildESMOutputs()
}

gogo()
// async function buildPacakgeEntry() {
//   const esEntryFile = path.join(ES_DIR, 'index.js');
//   const libEntryFile = path.join(LIB_DIR, 'index.js');
//   const styleEntryFile = path.join(LIB_DIR, `index.styl`);
//   genPackageEntry({
//     outputPath: esEntryFile,
//     pathResolver: (path) => `./${relative(ES_DIR, path)}`,
//   });

//   // process.env.MODULE_ENV = 'ES'
//   // await compilerJs(esEntryFile)


//   process.env.MODULE_ENV = 'LIB'
//   await copy(esEntryFile, libEntryFile)
//   await genPacakgeStyle()
//   await compileJs(libEntryFile)
//   await compilerSingleCss(styleEntryFile)
//   execa.sync('yarn', ['build:umd'],{
//     stdio: ['inherit', 'inherit', 'pipe']
//   })
// }
// await buildPacakgeEntry()




