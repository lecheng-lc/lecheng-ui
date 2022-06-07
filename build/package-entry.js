const { join } = require('path')
const packComponents = require('./get-component')()
const {
  pascalize,
  smartOutputFile,
  normalizePath,
  SRC_DIR
} = require('./common')
const skipInstall = ['bem', 'composables', 'locale', 'style', 'utils']
const { ES_DIR, getPackageJson } = require('./common') ;
function getPathByName(name, pathResolver) {
  let path = join(SRC_DIR, name);

  if (pathResolver) {
      path = pathResolver(path);
  }

  return normalizePath(path);
}
function genImports(components, pathResolver ,namedExport = true) {
  return components
    .map(name => {
      let path = join(ES_DIR, name);
      const pascalName = pascalize(name);
      const importName = namedExport ? `{ ${pascalName} }` : pascalName;
      const importPath = getPathByName(name, pathResolver);
      return `import ${importName} from '${importPath}';`;
    })
    .join('\n');
}

function genExports(names, pathResolver, namedExport) {
  if (namedExport) {
      const exports = names
          .map((name) => `export * from '${getPathByName(name, pathResolver)}';`)
          .join('\n');
      return `
export default {
  install,
  version,
};
${exports}
`;
  }
  return `
export {
  install,
  version,
  ${names.map(pascalize).join(',\n  ')}
};
`;
}

module.exports =  function genPackageEntry({ outputPath, pathResolver, }) {
  const names = packComponents.filter(item=>!skipInstall.includes(item))
  const version = process.env.PACKAGE_VERSION || getPackageJson().version;
  const namedExport = true
  const components = names.map(pascalize);
  const content = `${genImports(names, pathResolver, namedExport)}

const version = '${version}';

function install(app) {
  const components = [
    ${components.filter(item => !skipInstall.includes(item)).join(',\n    ')}
  ];

  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
${genExports(names, pathResolver, namedExport)}
`;

  smartOutputFile(outputPath, content);
}
