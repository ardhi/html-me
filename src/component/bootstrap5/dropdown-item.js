const Bs5 = require('./_class')
const button = require('./button')
const misc = require('./_misc')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ content, attrib, option })
  if (bs5.content[0] === '-') bs5.setAttrib('type', 'divider')
  let item
  switch (bs5.getAttrib('type')) {
    case 'text':
      bs5.setAttribClass('dropdown-item-text')
      item = misc({ tag: 'span', content: bs5.content, attrib: _.omit(bs5.attrib, ['type']) })
      break
    case 'header':
      bs5.setAttribClass('dropdown-header')
      item = misc({ tag: 'h6', content: bs5.content, attrib: _.omit(bs5.attrib, ['type']) })
      break
    case 'divider':
      bs5.setAttribClass('dropdown-divider')
      item = misc({ tag: 'hr', content: bs5.content, attrib: _.omit(bs5.attrib, ['type']) })
      break
    default:
      bs5.setAttrib('role', '')
      item = button({ tag: 'a', content: bs5.content, attrib: _.omit(bs5.attrib, ['type']), option: { commonClass: ['dropdown-item'] } })
  }
  return `<li>${item}</li>`
}
