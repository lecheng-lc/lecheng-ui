const { join } = require('path')
const packComponents = require('./get-component')()
const {
  pascalize,
  smartOutputFile,
  normalizePath,
} = require('./common')
const skipInstall = ['bem', 'composables', 'locale', 'style', 'utils']
const { ES_DIR, getPackageJson } = require('./common') ;
function genImports(components, options) {
  return components
    .map(name => {
      let path = join(ES_DIR, name);
      if (options.pathResolver) {
        path = options.pathResolver(path);
      }

      return `import ${pascalize(name)} from '${normalizePath(path)}';`;
    })
    .join('\n');
}

function genExports(names) {
  return names.map(name => `${name}`).join(',\n  ');
}

module.exports =  function genPackageEntry(options) {
  const names = packComponents.filter(item=>!skipInstall.includes(item))
  const version = process.env.PACKAGE_VERSION || getPackageJson().version;
  const components = names.map(pascalize);
  const content = `${genImports(names, options)}

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
export {
  install,
  version,
  ${genExports(components)}
};

export default {
  install,
  version
};
`;

  smartOutputFile(options.outputPath, content);
}
