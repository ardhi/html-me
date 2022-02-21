const label = require('./label')
const input = require('./input')
const Bs5 = require('./_class')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ content, attrib, option })
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'label' })
  const lblEl = label({ content, attrib: lblAttrib, option: { commonClass: ['btn'] } })
  bs5.attrib.autocomplete = 'off'
  bs5.attrib.type = option.radio ? 'radio' : 'checkbox'
  const inputEl = input({ attrib: _.omit(bs5.attrib, ['label']), option: { commonClass: ['btn-check'] } })
  return `${inputEl}\n${lblEl}`
}
