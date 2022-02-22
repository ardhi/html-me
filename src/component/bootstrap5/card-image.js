const image = require('./image')
const Bs5 = require('./_class')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ content, attrib })
  bs5.addToClass('align', 'card-img')
  return image({ attrib: bs5.attrib })
}
