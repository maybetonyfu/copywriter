const _ = require("lodash");

const SYSTEM_ENV_TERMINAL = "$ENV.";
function interpolateTemplateFile(payload) {
  // Replace system envs
  let vars = {};
  for ([key, value] of Object.entries(payload.vars)) {
    if (isMarkedAsSystemEnv(value)) {
      let systemEnvKey = getSystemEnvKey(value);
      let systemEnvValue = process.env[systemEnvKey];
      vars[key] = systemEnvValue;
    } else {
      vars[key] = value;
    }
  }
  try {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(payload.rawContent);
    const interpolatedContent = compiled(vars);
    return Promise.resolve(Object.assign({}, payload, { interpolatedContent }));
  } catch (error) {
    return Promise.reject(error);
  }
}

function isMarkedAsSystemEnv(val) {
  if (typeof val !== 'string') return false
  return val.startsWith(SYSTEM_ENV_TERMINAL);
}

function getSystemEnvKey(val) {
  return val.slice(SYSTEM_ENV_TERMINAL.length);
}

module.exports = interpolateTemplateFile;
