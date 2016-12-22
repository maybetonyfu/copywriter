const fs = require('fs-extra')

function createOutputDir (payload) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(payload.destinationDir)) {
      resolve(payload)
    }
    fs.mkdirs(payload.destinationDir, (err) => {
      if (err) {
        reject(err)
      }
      resolve(payload)
    })
  })
}

module.exports = createOutputDir
