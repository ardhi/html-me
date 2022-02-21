const Bs5 = require('./_class')

module.exports = function ({ content = [], attrib = {}, option = {} }) {
  option.commonClass = option.commonClass || ['form-control']
  if (attrib.plain) {
    attrib.readonly = true
    attrib.class.push('form-control-plaintext')
    _.pull(option.common, 'form-control')
  }
  const bs5 = new Bs5({ tag: 'textarea', content, attrib, option })
  bs5.addToClass('size', 'form-control')
  bs5.option.omitted.push('plain')
  return bs5.write()
}
