const Bs5 = require('./_class')
const dropdownItem = require('./dropdown-item')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['dropdown-menu']
  const bs5 = new Bs5({ tag: 'ul', content, attrib, option })
  if (bs5.getAttrib('dark')) bs5.setAttribClass('dropdown-menu-dark')
  if (bs5.getAttrib('leftAlignResponsive') === true) bs5.setAttrib('leftAlignResponsive', 'lg')
  if (bs5.getAttrib('rightAlignResponsive') === true) bs5.setAttrib('rightAlignResponsive', 'lg')

  if (bs5.getAttrib('rightAlign')) bs5.setAttribClass('dropdown-menu-end')
  else if (bs5.getAttrib('rightAlignResponsive')) bs5.setAttribClass(`dropdown-menu-${bs5.getAttrib('rightAlignResponsive')}-end`)
  else if (bs5.getAttrib('leftAlignResponsive')) bs5.setAttribClass('dropdown-menu-end', `dropdown-menu-${bs5.getAttrib('leftAlignResponsive')}-start`)
  _.each(bs5.content, (c, idx) => {
    if (_.isPlainObject(c)) bs5.content[idx] = dropdownItem({ content: c.content, attrib: _.omit(c, ['content']) })
    else if (c === '-') bs5.content[idx] = dropdownItem({ content: c })
  })
  bs5.option.omitted.push('dark', 'rightAlign', 'rightAlignResponsive', 'leftAlignResponsive')
  return bs5.write()
}
