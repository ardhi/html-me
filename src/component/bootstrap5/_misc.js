const Bs5 = require('./_class')

module.exports = function ({ tag, content, attrib = {}, option = {} }) {
  tag = tag || option.compName
  if (['hr', 'br'].includes(tag)) content = []
  const bs5 = new Bs5({ tag, content, attrib, option })
  return bs5.write()
}
