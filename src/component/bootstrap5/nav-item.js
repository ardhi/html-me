const Bs5 = require('./_class')
const misc = require('./_misc')
const dropdownMenu = require('./dropdown-menu')

module.exports = function ({ content, attrib = {} }) {
  const bs5 = new Bs5({ tag: 'a', content, attrib, option: { commonClass: ['nav-link'] } })
  let menuEl
  const menuAttrib = bs5.filterAttrib('menu')
  if (bs5.getAttrib('dropdown')) {
    bs5.setAttribClass('dropdown-toggle')
    bs5.setAttrib('dataBsToggle', 'dropdown')
    bs5.setAttrib('role', 'button')
    bs5.setAttrib('ariaExpanded', false)
    menuEl = dropdownMenu({ content: bs5.getAttrib('dropdown'), attrib: menuAttrib })
    delete bs5.attrib.dropdown
  }
  bs5.setAttrib('href', bs5.getAttrib('href', '#'))
  bs5.addToClass('disabled')
  if (bs5.getAttrib('active')) {
    bs5.setAttrib('ariaCurrent', 'page')
    bs5.addToClass('active')
  }
  const wrapperAttrib = bs5.filterAttrib('wrapper')
  bs5.option.omitted.push('type')
  const linkEl = bs5.write()
  const items = [linkEl]
  if (menuEl) items.push(menuEl)
  const option = { commonClass: ['nav-item'] }
  if (attrib.dropdown) option.commonClass.push('dropdown')
  return misc({ tag: 'li', attrib: wrapperAttrib, content: items, option })
}
