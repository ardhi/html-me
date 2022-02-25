const Bs5 = require('./_class')
const button = require('./button')
const misc = require('./_misc')
const dropdownMenu = require('./dropdown-menu')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const btnAttrib = bs5.filterAttrib('button', { asValueFor: 'text' })
  const splitAttrib = bs5.filterAttrib('split')
  let splitEl
  if (splitAttrib.matched) {
    splitAttrib.color = splitAttrib.color || btnAttrib.color
    splitAttrib.dataBsToggle = 'dropdown'
    splitAttrib.ariaExpanded = 'false'
    splitAttrib.class.push('dropdown-toggle', 'dropdown-toggle-split')
    if (bs5.attrib.offset) splitAttrib.dataBsOffset = bs5.attrib.offset
    if (bs5.attrib.reference) splitAttrib.dataBsReference = bs5.attrib.reference
    const c = misc({ tag: 'span', content: 'Toggle Dropdown', attrib: { class: 'visually-hidden' } })
    splitEl = button({ content: c, attrib: splitAttrib })
  } else {
    if (bs5.attrib.offset) btnAttrib.dataBsOffset = bs5.attrib.offset
    if (bs5.attrib.reference) btnAttrib.dataBsReference = bs5.attrib.reference
    btnAttrib.class.push('dropdown-toggle')
    btnAttrib.dataBsToggle = 'dropdown'
    btnAttrib.ariaExpanded = 'false'
  }
  const btnEl = button({ attrib: btnAttrib })
  const menuAttrib = bs5.filterAttrib('menu')
  const menuEl = dropdownMenu({ content: bs5.content, attrib: menuAttrib })
  bs5.content = [btnEl, menuEl]
  if (splitEl) bs5.content.splice(1, 0, splitEl)
  bs5.attrib.class = bs5.normalizeArray(bs5.attrib.class, { common: [splitEl ? 'btn-group' : 'dropdown'] })
  bs5.addToClass('dropDir')
  bs5.option.omitted.push('button', 'menu', 'split', 'offset', 'reference', 'autoClose')
  return bs5.write()
}
