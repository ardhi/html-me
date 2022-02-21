const Bs5 = require('./_class')
const label = require('./label')
const input = require('./input')
const misc = require('./_misc')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  attrib.type = option.radio ? 'radio' : 'checkbox'
  let bs5 = new Bs5({ tag: 'div', attrib, option })
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'label' })
  const lblEl = label({ content, attrib: lblAttrib, option: { commonClass: ['form-check-label'] } })
  const wrapperAttrib = bs5.filterAttrib('wrapper', { class: { common: ['form-check'] } })
  const inputEl = input({ attrib: _.omit(attrib, ['label']), option: { commonClass: ['form-check-input'], omitted: ['noWrapper'] } })
  if (attrib.noWrapper) return inputEl
  if (_.isEmpty(bs5.content)) return misc({ content: inputEl, attrib: wrapperAttrib })
  bs5 = new Bs5({ tag: 'div', attrib: wrapperAttrib, option: { omitted: ['inline'] } })
  if (bs5.attrib.inline) bs5.attrib.class.push('form-check-inline')
  bs5.content = [inputEl, lblEl]
  return bs5.write()
}
