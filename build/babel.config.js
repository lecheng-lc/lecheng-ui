const transferCommonStyle = require('./plugin/transferCommonStyle')
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: process.env.MODULE_ENV === 'ES' ? false: 'commonjs'
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
