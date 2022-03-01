const Bs5 = require('./_class')
const misc = require('./_misc')
const _ = require('lodash')

const prev = function (attr) {
  attr.href = attr.href || '#'
  if (attr.icon === true) {
    attr.ariaLabel = 'Previous'
    attr.label = misc({ tag: 'span', content: '&laquo;', attrib: { ariaHidden: true } })
  }
  delete attr.icon
  return attr
}

const next = function (attr) {
  attr.href = attr.href || '#'
  if (attr.icon === true) {
    attr.ariaLabel = 'Next'
    attr.label = misc({ tag: 'span', content: '&raquo;', attrib: { ariaHidden: true } })
  }
  return attr
}

module.exports = function ({ content, attrib, option }) {
  const bs5 = new Bs5({ tag: 'nav', attrib, content })
  bs5.setAttrib('ariaLabel', bs5.getAttrib('ariaLabel', 'Result pages'))
  const prevAttr = bs5.filterAttrib('prev', { asValueFor: 'label' })
  const nextAttr = bs5.filterAttrib('next', { asValueFor: 'label' })
  if (prevAttr.label) bs5.content.unshift(prev(prevAttr))
  if (nextAttr.label) bs5.content.push(next(nextAttr))
  _.each(bs5.content, (c, idx) => {
    if (!_.isPlainObject(c)) c = { href: '#', label: c }
    const linkAttrib = _.omit(c, ['label', 'disabled', 'active'])
    let tag = 'a'
    if (c.disabled) tag = 'span'
    if (c.active) tag = bs5.getAttrib('linkOnActive') !== true ? 'span' : 'a'
    if (tag !== 'a') delete linkAttrib.href
    const bs5Link = new Bs5({ tag, content: c.label, attrib: linkAttrib, option: { commonClass: ['page-link'] } })
    const wrapperAttr = _.omit(c, ['label', 'href', 'ariaLabel'])
    const bs5Wrapper = new Bs5({ tag: 'li', content: bs5Link.write(), attrib: wrapperAttr, option: { commonClass: ['page-item'] } })
    if (bs5Wrapper.getAttrib('active')) bs5Wrapper.setAttrib('ariaCurrent', 'page')
    bs5Wrapper.addToClass('disabled')
    bs5Wrapper.addToClass('active')
    bs5.content[idx] = bs5Wrapper.write()
  })
  const bs5Wrapper = new Bs5({ tag: 'ul', content: bs5.content, attrib: _.omit(bs5.attrib, ['ariaLabel']), option: { commonClass: ['pagination'] } })
  bs5Wrapper.addToClass('size', 'pagination')
  bs5Wrapper.addToClass('align', 'justify-content')
  bs5.content = [bs5Wrapper.write()]
  bs5.attrib = _.pick(bs5.attrib, ['ariaLabel'])
  return bs5.write()
}
