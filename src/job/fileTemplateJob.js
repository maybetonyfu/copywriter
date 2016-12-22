const readTemplateFile = require('./task/readTemplateFile.js')
const interpolateTemplateFile = require('./task/interpolateTemplateFile.js')
const writeInterpolatedFile = require('./task/writeInterpolatedFile.js')
const validateExtension = require('./task/validateExtension.js')
const createOutputDir = require('./task/createOutputDir.js')

function fileTemplateJob (payload) {
  return Promise.resolve(payload)
        .then(validateExtension)
        .then(readTemplateFile)
        .then(interpolateTemplateFile)
        .then(createOutputDir)
        .then(writeInterpolatedFile)
        .then(data => Promise.resolve(data))
        .catch(err => {
          throw err
        })
}

module.exports = fileTemplateJob
