const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = [attrib.vertical ? 'btn-group-vertical' : 'btn-group']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  bs5.role = 'group'
  bs5.addToClass('size', 'btn-group')
  bs5.option.omitted.push('vertical')
  return bs5.write()
}
