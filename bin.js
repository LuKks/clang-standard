#!/usr/bin/env node

const { program } = require('commander')
const safetyCatch = require('safety-catch')
const pkg = require('./package.json')

const main = program
  .version(pkg.version)
  .description(pkg.description)
  .addCommand(require('./bin/init.js'))
  .addCommand(require('./bin/check.js'))
  .addCommand(require('./bin/fix.js'))
  .action(require('./lib/check.js'))

main.parseAsync().catch(err => {
  safetyCatch(err)
  console.error('error: ' + err.message)
  process.exit(1)
})
