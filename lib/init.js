const fs = require('fs')
const path = require('path')

const TEMPLATE = path.join(__dirname, '..', 'template.clang-format')

module.exports = async function init (opts = {}) {
  const {
    cwd = path.resolve('.')
  } = opts

  const filename = path.join(cwd, '.clang-format')
  const content = await fs.promises.readFile(TEMPLATE)

  await fs.promises.writeFile(filename, content)
}
