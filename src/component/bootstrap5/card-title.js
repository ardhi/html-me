const misc = require('./_misc')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['card-title']
  return misc({ tag: 'h5', content, attrib, option })
}
