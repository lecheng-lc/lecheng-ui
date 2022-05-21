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
    [
      '@vue/babel-plugin-jsx',
      {
        enableObjectSlots: false,
      },
    ],
    [
      transferCommonStyle
    ]
  ]
}
