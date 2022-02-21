const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'option', content, attrib, option })
  bs5.option.omitted.push('label')
  return bs5.write()
}
