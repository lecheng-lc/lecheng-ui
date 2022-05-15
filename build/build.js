const execa = require('execa')
process.env.MODULE_ENV = 'ES'
execa.sync('yarn', ['compile'],{
  stdio: ['inherit', 'inherit', 'pipe']
})
process.env.MODULE_ENV = 'LIB'
execa.sync('yarn', ['compile'])
