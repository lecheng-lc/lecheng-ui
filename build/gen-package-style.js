const { join } = require('path')
const { existsSync } = require('fs-extra')
const { smartOutputFile, normalizePath } = require('./common')
const components = require('./get-component')('style')
const CSS_LANG = 'styl'
const { LIB_DIR } = require('./common')
const baseStyle = `@import "../packages/style/base.styl"`

exports.genPacakgeStyle = function genPacakgeStyle() {
  let content = `${baseStyle};\n`
  for (let i = 0; i < components.length; i++) {
    content += `@import "../packages/${components[i]}/index.${CSS_LANG}";\n`;
  }
  const outputPath = join(LIB_DIR, 'index.styl')
  smartOutputFile(outputPath, content);
}
