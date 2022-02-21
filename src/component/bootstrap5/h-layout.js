const Bs5 = require('./_class')
const label = require('./label')
const _ = require('lodash')
const defWidth = ['col-sm-3', 'col-sm-9']

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.defaultClass = ['mb-3']
  const bs5 = new Bs5({ tag: 'div', content, attrib: _.omit(attrib, ['label']), option })
  let l
  let r
  if (bs5.attrib.width) {
    if (_.isString(bs5.attrib.width)) [l, r] = _.map(bs5.attrib.width.split(':'), w => _.trim(w))
    else [l, r] = bs5.attrib.width
  }
  if (!l) l = defWidth[0]
  if (!r) r = defWidth[1]
  l = bs5.normalizeWidth(l)
  r = bs5.normalizeWidth(r)
  bs5.attrib.class = bs5.normalizeArray(bs5.attrib.class, { default: 'mb-3', common: ['row'] })
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'label' })
  lblAttrib.label = attrib.label
  lblAttrib.class.unshift(`${l} col-form-label`)
  if (lblAttrib.size) lblAttrib.class.push(`col-form-label-${lblAttrib.size}`)
  const lblEl = label({ attrib: lblAttrib })
  const inputEl = bs5.content

  const cntrAttrib = bs5.filterAttrib('container')
  cntrAttrib.class.unshift(r)
  const cntrBs5 = new Bs5({ tag: 'div', content: inputEl, attrib: cntrAttrib })
  const cntrEl = cntrBs5.write()
  bs5.content = [lblEl, cntrEl]
  bs5.option.omitted.push('width')
  return bs5.write()
}
