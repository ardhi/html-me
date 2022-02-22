const misc = require('./_misc')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['card-text']
  return misc({ tag: 'p', content, attrib, option })
}
