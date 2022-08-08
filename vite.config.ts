import { defineConfig } from 'vite'
import vitePluginVue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import vitePluginMd from 'vite-plugin-md';
import vueJsx from '@vitejs/plugin-vue-jsx'
// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import hljs from 'highlight.js';
const  createRequire  = require('module')
// import type MarkdownIt from 'markdown-it'

// add target="_blank" to all links
function markdownLinkOpen(md: any) {
  const defaultRender = md.renderer.rules.link_open;

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    }

    if (defaultRender) {
      return defaultRender(tokens, idx, options, env, self);
    }

    return self.renderToken(tokens, idx, options);
  };
}
function markdownHighlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    // https://github.com/highlightjs/highlight.js/issues/2277
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
  }

  return '';
}
function markdownCardWrapper(htmlCode: string) {
  const group = htmlCode
    .replace(/<h3/g, ':::<h3')
    .replace(/<h2/g, ':::<h2')
    .split(':::');

  return group
    .map((fragment) => {
      if (fragment.indexOf('<h3') !== -1) {
        return `<div class="van-doc-card">${fragment}</div>`;
      }
      return fragment;
    })
    .join('');
}
export default defineConfig({
  root:path.resolve(__dirname, './docs/src/'),
  css:{
    preprocessorOptions:{
      styl: {
        // additionalData: '~@@: /docs/packages;'
      },
    },

  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./docs'),
      '@@': path.resolve(__dirname, './packages')
    }
  },
  define: {
    'process.env': {}
  },
  plugins: [
    vitePluginVue({
      include: [/\.vue$/, /\.md$/],
    }),
    // dynamicImportVars({
    //   // options
    // }),
    Components({
      dts: true,
      dirs: ['./packages'], // 按需加载的文件夹
      resolvers: [
     ]
    }),
    vitePluginMd({
      // wrapperClasses: 'van-doc-markdown-body',
      // transforms: {
      //   after: markdownCardWrapper,
      // },
      // markdownItOptions: {
      //   typographer: false, // https://markdown-it.github.io/markdown-it/#MarkdownIt
      //   highlight: markdownHighlight,
      // },
      // markdownItSetup(md: any) {
      //   const require = createRequire(import.meta.url);
      //   console.log(import.meta.url,'=====')
      //   const { slugify } = require('transliteration')
      //   const markdownItAnchor = require('markdown-it-anchor');
      //   markdownLinkOpen(md);
      //   md.use(markdownItAnchor, {
      //     level: 2,
      //     // slugify,
      //   });
      // },
    }),
    vueJsx({}),

  ],
  server: {
    host: '0.0.0.0',
  },
})
