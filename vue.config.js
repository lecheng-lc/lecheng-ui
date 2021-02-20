const dir = 'docs-fuben'
module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: `${dir}/src/main.ts`,
      outputDir: `${dir}/dist/`,
      template: `${dir}/public/index.html`,
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    demo: {
      entry: `${dir}/src/demo/main.ts`,
      outputDir: `${dir}/dist/demo/`,
      template: `${dir}/public/index.html`,
      filename: 'demo.html',
      chunks: ['chunk-vendors', 'chunk-common', 'demo']
    }
  },
  chainWebpack: (config) => {
    config
      .resolve.alias
      .set('@', `${__dirname}/${dir}/src`)
      .set('@@', `${__dirname}/packages`)
      .end()
      .extensions
      .add('.md')
      .prepend('.ts')
      .prepend('.tsx')
      .end();

    config.module.rule('md')
      .test(/\.md/)
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });
  },
};
