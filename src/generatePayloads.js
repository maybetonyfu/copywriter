const path = require('path')

function generatePayloads (config) {
  const {
    mappings,
    extensions,
    vars
  } = config

  return mappings
    .map(([source, destination]) => {
      const sourceDir = path.dirname(source)
      const destinationDir = path.dirname(destination)
      const sourceName = path.basename(source)
      const destinationName = path.basename(destination)
      return {
        sourceDir,
        destinationDir,
        sourceName,
        destinationName,
        vars,
        extensions,
        rawContent: '',
        interpolatedContent: ''
      }
    })
}

module.exports = generatePayloads
