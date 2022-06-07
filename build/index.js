const path = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const esbuild = require('esbuild')
const babelConfig = { // babel配置
  configFile: path.join(__dirname, './babel.config.js')
}
const filePath = path.resolve(process.cwd(), './build/test.js')

console.log(babelConfig)
async function  aa(){
  // const result = babel.transformFileSync(filePath,babelConfig)
  let codeData= fs.readFileSync(filePath, 'utf-8');
  const esbuildResult = await esbuild.transform(codeData, {
    loader: 'ts',
    target: 'es2016',
    format: 'cjs',
  });
  let { code } = esbuildResult;
  fs.outputFileSync('./hh.js', code)
}
aa()

