const Bs5 = require('./_class')

module.exports = function ({ attrib = {}, option = {} }) {
  attrib.class = attrib.class || []
  if (attrib.responsive) attrib.class.push('img-fluid')
  if (attrib.thumbnail) attrib.class.push('img-thumbnail')
  if (attrib.holder) attrib.dataSrc = `holder.js/${attrib.holder}`
  const bs5 = new Bs5({ tag: 'img', content: [], attrib, option })
  bs5.addToClass('rounded', 'rounded')
  bs5.option.omitted.push('responsive', 'thumbnail', 'holder')
  return bs5.write()
}
