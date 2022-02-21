const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'label', content, attrib, option })
  return bs5.write()
}
