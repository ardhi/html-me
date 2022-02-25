const Bs5 = require('./_class')

module.exports = function ({ attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'option', content: attrib.text, attrib, option })
  bs5.option.omitted.push('text')
  return bs5.write()
}
