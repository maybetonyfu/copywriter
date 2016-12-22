const fs = require('fs')
const path = require('path')

function readTemplateFile (payload) {
  return new Promise((resolve, reject) => {
    const readFileOptions = [
      path.join(payload.sourceDir, payload.sourceName),
      'utf8',
      (err, rawContent) => {
        if (err) {
          reject(err)
        }
        resolve(Object.assign({}, payload, { rawContent }))
      }
    ]

    fs.readFile(...readFileOptions)
  })
}

module.exports = readTemplateFile
