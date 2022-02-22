const misc = require('./_misc')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['card-subtitle', 'text-muted', 'mb-2']
  return misc({ tag: 'h6', content, attrib, option })
}
