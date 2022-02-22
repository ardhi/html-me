const Bs5 = require('./_class')
const button = require('./button')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const id = bs5.getAttrib('id') || bs5.generateId()
  bs5.setAttribClass('collapse')
  bs5.setAttrib('id', id)
  const btnAttrib = bs5.filterAttrib('button')
  if (btnAttrib.tag === 'a') btnAttrib.href = '#' + id
  else btnAttrib.dataBsTarget = '#' + id
  btnAttrib.dataBsToggle = 'collapse'
  btnAttrib.ariaExpanded = 'false'
  btnAttrib.ariaControls = id
  const btnEl = button({ attrib: btnAttrib })
  if (bs5.getAttrib('horizontal')) {
    const minHeight = bs5.getAttrib('minHeight')
    if (minHeight) bs5.setAttrib('style.minHeight', minHeight)
  }
  bs5.option.omitted.push('horizontal', 'minHeight')
  return `<p>${btnEl}</p>\n${bs5.write()}`
}
