const Bs5 = require('./_class')
const misc = require('./_misc')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  bs5.content = [_.isEmpty(bs5.content) ? '' : misc({ tag: 'span', content: bs5.content, attrib: { class: ['visually-hidden'] } })]
  const common = bs5.attrib.grow ? ['spinner-grow'] : ['spinner-border']
  bs5.attrib.class = bs5.normalizeArray(bs5.attrib.class, { common })
  bs5.setAttrib('role', 'status')
  bs5.addToClass('color', 'text')
  if (bs5.attrib.small) bs5.setAttribClass(`${common[0]}-sm`)
  bs5.option.omitted.push('grow', 'small')
  return bs5.write()
}
