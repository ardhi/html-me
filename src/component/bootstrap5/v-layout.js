const Bs5 = require('./_class')
const label = require('./label')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.defaultClass = ['mb-3']
  const bs5 = new Bs5({ tag: 'div', content, attrib: _.omit(attrib, ['label']), option })
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'label' })
  lblAttrib.label = attrib.label
  const lblEl = label({ attrib: lblAttrib })
  bs5.content.unshift(lblEl)
  return bs5.write()
}
