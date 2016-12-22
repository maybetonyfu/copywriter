const fs = require('fs-extra')
const path = require('path')
const getExtensionName = require('./helper/getExtensionName.js')

function mapFromDirEntries (config) {
  const {
    mappings,
    extensions
  } = config

  return mappings
        .filter(([inputEntry, outputEntry]) => fs.statSync(inputEntry).isDirectory())
        .reduce((dirMap, [inputDir, outputDir]) => {
          const dirEntryMap = fs.walkSync(inputDir)
                .filter(inputFile => extensions.includes(getExtensionName(inputFile)))
                .reduce((entryMap, inputFile) => {
                  const outputFile = inputFile
                        .replace(inputDir, outputDir)
                        .replace(path.extname(inputFile), '')

                  return entryMap.set(inputFile, outputFile)
                }, new Map())

          return new Map([...dirMap, ...dirEntryMap])
        }, new Map())
}

module.exports = mapFromDirEntries
