const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option: { commonClass: ['card-body'] } })
  return bs5.write()
}
