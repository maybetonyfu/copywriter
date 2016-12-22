const _ = require('lodash')
const path = require('path')
const mapFromFileEntries = require('./mapFromFileEntries.js')
const mapFromDirEntries = require('./mapFromDirEntries.js')
const generatePayloads = require('./generatePayloads.js')
const fileTemplateJob = require('./job/fileTemplateJob.js')

function rapidTemplate (props) {
  const vars = props.vars
  const extensions = props.options.templateExtensions || []
  const mappings = _.entries(props.mappings).map((mapping) => mapping.map(path.normalize))
  const collapsedConfig = {
    mappings,
    extensions,
    vars
  }
  const standaloneFileMappings = mapFromFileEntries(collapsedConfig)
  const dirFileMappings = mapFromDirEntries(collapsedConfig)
  const expandedMapping = Array.from(new Map([...dirFileMappings, ...standaloneFileMappings]))
  const expandedConfig = {
    mappings: expandedMapping,
    extensions,
    vars
  }
  const payloads = generatePayloads(expandedConfig)
  const allJobs = payloads.map(fileTemplateJob)
  Promise.all(allJobs).then((results) => console.log(`${results.length} jobs complete`))
}

module.exports = rapidTemplate
