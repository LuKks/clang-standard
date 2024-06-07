const { createCommand } = require('commander')

module.exports = createCommand('fix')
  .description('apply format corrections')
  .option('--cwd [path]', 'custom working directory')
  .action(require('../lib/fix.js'))
