const getExtensionName = require('./../../helper/getExtensionName.js')

function validateExtension (payload) {
  return new Promise((resolve, reject) => {
    if (payload.extensions.includes(getExtensionName(payload.sourceName))) {
      resolve(payload)
    } else {
      reject(new Error('File extension doesn\'t match'))
    }
  })
}

module.exports = validateExtension
