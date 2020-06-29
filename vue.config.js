module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'docs/src/main.ts',
      outputDir: 'docs/dist/',
      template: 'docs/public/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  chainWebpack: (config) => {
    config
      .resolve.alias
      .set('@', `${__dirname}/docs/src`)
      .set('@@', `${__dirname}/packages`)
      .end()
      .extensions
      .add('.md')
      .prepend('.ts')
      .prepend('.tsx')
      .end();

    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });
  },
};
