const Bs5 = require('./_class')
const _ = require('lodash')

module.exports = function ({ attrib = {}, option = {} }) {
  option.commonClass = option.commonClass || ['form-control']
  attrib.type = attrib.type || 'text'
  if (attrib.plain) {
    attrib.readonly = true
    attrib.class.push('form-control-plaintext')
    _.pull(option.common, 'form-control')
  }
  const bs5 = new Bs5({ tag: 'input', content: [], attrib, option })
  bs5.addToClass('size', 'form-control')
  return bs5.write(_.concat(['plain'], option.omitted || []))
}
