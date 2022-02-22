const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'a', content, attrib, option })
  if (!bs5.getAttrib('href')) bs5.setAttrib('href', '#')
  return bs5.write()
}
