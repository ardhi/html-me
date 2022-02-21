const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.defaultClass = ['me-2', 'flex-shrink-0']
  const bs5 = new Bs5({ tag: 'i', content, attrib, option })
  let name = bs5.content[0] || ''
  if (!name.includes('-')) name = 'bi-' + name
  bs5.attrib.class.push(name)
  bs5.content = ['']
  return bs5.write()
}
