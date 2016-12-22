const _ = require('lodash')

function interpolateTemplateFile (payload) {
  try {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const compiled = _.template(payload.rawContent)
    const interpolatedContent = compiled(payload.vars)
    return Promise.resolve(Object.assign({}, payload, { interpolatedContent }))
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = interpolateTemplateFile
