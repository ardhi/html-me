const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['input-group-text']
  const bs5 = new Bs5({ tag: 'span', content, attrib, option })
  return bs5.write()
}
