const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['badge']
  const bs5 = new Bs5({ tag: 'span', content, attrib, option })
  bs5.addToClass('color', 'bg')
  bs5.addToClass('rounded', 'rounded')
  bs5.addToClass('position', 'position')
  bs5.addToClass('top', 'top', false)
  bs5.addToClass('start', 'start', false)
  bs5.addToClass('translate', 'translate')
  bs5.addToClass('border', 'border border')
  return bs5.write()
}
