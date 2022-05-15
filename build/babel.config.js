const transferCommonStyle = require('./plugin/transferCommonStyle')
const { MODULE_ENV } = require('./common')
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: MODULE_ENV === 'ES' ? false: 'commonjs'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    // '@vue/babel-plugin-jsx',
    // '@babel/plugin-proposal-optional-chaining',
    // ["@babel/plugin-proposal-private-methods", { "loose": true }],
    // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     corejs: false,
    //     helpers: true,
    //     regenerator: true,
    //     useESModules: false
    //   }
    // ],
    // [
    //   '@babel/plugin-proposal-class-properties',
    //   {
    //     loose: true
    //   }
    // ],
    [
      transferCommonStyle
    ]
  ]
}
