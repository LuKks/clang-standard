const { createCommand } = require('commander')

module.exports = createCommand('init')
  .description('create clang-format file')
  .option('--cwd [path]', 'custom working directory')
  .action(require('../lib/init.js'))
