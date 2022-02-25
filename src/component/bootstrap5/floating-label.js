const Bs5 = require('./_class')
const label = require('./label')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = option.commonClass || ['form-floating']
  const bs5 = new Bs5({ tag: 'div', content, attrib: _.omit(attrib, ['label']), option })
  bs5.attrib.label = attrib.label
  const lblAttrib = bs5.filterAttrib('label', { asValueFor: 'text' })
  const lblEl = label({ attrib: lblAttrib })
  bs5.content.push(lblEl)
  return bs5.write()
}
