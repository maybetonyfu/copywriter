function getExtensionName (path) {
  return path.substr((~-path.lastIndexOf('.') >>> 0) + 2)
}

module.exports = getExtensionName
