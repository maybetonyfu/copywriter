const fs = require('fs-extra')
const getExtensionName = require('./helper/getExtensionName.js')

function mapFromFileEntries (config) {
  const {
    mappings,
    extensions
  } = config

  return mappings
        .filter(([inputEntry, outputEntry]) => fs.statSync(inputEntry).isFile())
        .filter(([inputEntry, outputEntry]) => extensions.includes(getExtensionName(inputEntry)))
        .reduce((entryMap, [inputFile, outputFile]) => entryMap.set(inputFile, outputFile), new Map())
}

module.exports = mapFromFileEntries
