const transferCommonStyle = require('./plugin/transferCommonStyle')

module.exports = {
  presets: [
    'vca-jsx',
    [
      '@babel/preset-env',
      {
        loose: false,
        modules: 'commonjs'
      }
    ],
    [
      '@vue/babel-preset-jsx',
      {
        functional: false
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    [
      transferCommonStyle
    ]
  ]
}
