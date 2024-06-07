const { createCommand } = require('commander')

module.exports = createCommand('check')
  .description('dry run format to output style errors')
  .option('--cwd [path]', 'custom working directory')
  .action(require('../lib/check.js'))
