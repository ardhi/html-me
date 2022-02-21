const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['input-group']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  bs5.addToClass('size', 'input-group')
  bs5.addToClass('nowrap', 'flex')
  return bs5.write()
}
