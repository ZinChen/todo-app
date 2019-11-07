module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: [
            'last 3 versions'
          ]
        }
      }
    ]
    // '@vue/app',
    // ['env', { 'modules': false }]
  ],
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    test: {
    presets: [
        ['env', { targets: { node: 'current' }}]
      ]
    }
  }
}
