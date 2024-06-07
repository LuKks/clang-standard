const path = require('path')
const { execSync } = require('child_process')
const findFiles = require('./find-files.js')

module.exports = async function check (opts = {}) {
  const {
    cwd = path.resolve('.'),
    stdio = 'inherit'
  } = opts

  const files = await findFiles(cwd)

  if (files.length === 0) {
    console.log('No files found to check.')
    process.exitCode = 1
    return
  }

  try {
    execSync('clang-format --dry-run --Werror ' + files.join(' '), { cwd, stdio })

    process.exitCode = 0
  } catch (err) {
    process.exitCode = err.status
  }

  return process.exitCode
}
