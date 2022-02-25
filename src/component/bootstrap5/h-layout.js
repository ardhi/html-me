const Bs5 = require('./_class')
const label = require('./label')
const _ = require('lodash')
const defWidth = ['col-sm-3', 'col-sm-9']

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.defaultClass = ['mb-3']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  let l
  let r
  if (bs5.attrib.width) {
    if (_.isString(bs5.attrib.width)) [l, r] = _.map(bs5.attrib.width.split(':'), w => _.trim(w))
    else [l, r] = bs5.attrib.width
  }
  if (!l) l = defWidth[0]
  if (!r) r = defWidth[1]
  l = bs5.normalizeColWidth(l)
  r = bs5.normalizeColWidth(r)
  bs5.attrib.class = bs5.normalizeArray(bs5.attrib.class, { default: 'mb-3', common: ['row'] })
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'text' })
  lblAttrib.class.unshift(`${l} col-form-label`)
  if (lblAttrib.size) lblAttrib.class.push(`col-form-label-${lblAttrib.size}`)
  const lblEl = label({ attrib: lblAttrib })
  const inputEl = bs5.content

  const wrapperAttrib = bs5.filterAttrib('wrapper')
  wrapperAttrib.class.unshift(r)
  const wrapperBs5 = new Bs5({ tag: 'div', content: inputEl, attrib: wrapperAttrib })
  const wrapperEl = wrapperBs5.write()
  bs5.content = [lblEl, wrapperEl]
  bs5.option.omitted.push('width')
  return bs5.write()
}
