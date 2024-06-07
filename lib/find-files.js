const fs = require('fs')
const path = require('path')

module.exports = async function findFiles (dir) {
  const files = []
  const iterator = await readdir(dir)

  if (!iterator) {
    return files
  }

  for await (const dirent of iterator) {
    const filename = path.join(dir, dirent.name)

    if (dirent.isDirectory()) {
      if (dirent.name === '.git' || dirent.name === 'node_modules') {
        continue
      }

      const moreFiles = await findFiles(filename)

      files.push(...moreFiles)
    } else if (filename.match(/\.(h|c|cpp|ino)$/)) {
      // TODO: Option to include/ignore files
      files.push(filename)
    }
  }

  return files
}

async function readdir (dir) {
  try {
    return await fs.promises.readdir(dir, { withFileTypes: true })
  } catch {
    return null
  }
}
