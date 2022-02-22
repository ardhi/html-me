const Bs5 = require('./_class')
const _ = require('lodash')
const spinner = require('./spinner')

module.exports = function ({ tag, content, attrib = {}, option = {} }) {
  if (tag) attrib.tag = tag
  option.commonClass = option.commonClass || ['btn']
  const bs5 = new Bs5({ tag: 'button', content, attrib, option })
  const ttAttrib = bs5.filterAttrib('tooltip', { asValueFor: 'title' })
  bs5.addToClass('nowrap', 'text')
  if (bs5.tag === 'a') {
    bs5.attrib.role = 'button'
    bs5.attrib.href = bs5.attrib.href || '#'
    if (bs5.attrib.disabled) {
      delete bs5.attrib.href
      delete bs5.attrib.disabled
      bs5.attrib.class.push('disabled')
      bs5.attrib.ariaDisabled = true
      bs5.attrib.tabIndex = '-1'
    }
  } else bs5.attrib.type = bs5.attrib.type || 'button'
  if (ttAttrib.title) {
    bs5.attrib.dataBsToggle = 'tooltip'
    bs5.attrib.dataBsPlacement = ttAttrib.placement
  }
  bs5.addToClass('position', 'position')
  bs5.addToClass('size', 'btn')
  bs5.addToClass('color', bs5.attrib.outline ? 'btn-outline' : 'btn')
  bs5.option.omitted.push('outline')
  const spinnerAttrib = bs5.filterAttrib('spinner')
  if (spinnerAttrib.matched) {
    spinnerAttrib.ariaHidden = 'true'
    spinnerAttrib.tag = 'span'
    spinnerAttrib.small = true
    const spinnerEl = spinner({ attrib: spinnerAttrib })
    bs5.content.unshift(spinnerEl)
  }
  return bs5.write()
}
