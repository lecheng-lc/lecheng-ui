const dir = 'docs'
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
  devServer:{
    port:3030,
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    config
      .resolve.alias
      .set('@', `${__dirname}/${dir}`)
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
      .use('@vant/markdown-loader')
      .loader('@vant/markdown-loader')
      .options({
        linkOpen: true
      });
  },
};
