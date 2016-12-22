const fs = require('fs')
const path = require('path')

function writeInterpolatedFile (payload) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
            path.join(payload.destinationDir, payload.destinationName),
            payload.interpolatedContent,
            'utf8',
            (err) => {
              if (err) {
                reject(err)
              }
              resolve(`File templating complete: ${payload.destinationName}`)
            }
        )
  })
}

module.exports = writeInterpolatedFile
