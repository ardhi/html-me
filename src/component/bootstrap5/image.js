const Bs5 = require('./_class')
const _ = require('lodash')

module.exports = function ({ attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'img', content: [], attrib, option })
  bs5.addToClass('responsive', 'img')
  bs5.addToClass('thumbnail', 'img')
  bs5.addToClass('rounded', 'rounded')
  const holderAttr = bs5.filterAttrib('holder', { asValueFor: 'src' })
  if (holderAttr.src) {
    bs5.setAttrib('dataSrc', 'holder.js/' + holderAttr.src)
    _.each(['theme', 'random', 'bg', 'fg', 'text', 'size', 'font', 'align', 'outline', 'lineWrap'], (v, idx) => {
      if (holderAttr[v]) bs5.attrib.dataSrc += `${idx === 0 ? '?' : '&'}${v}=${holderAttr.theme}`
    })
  }
  return bs5.write()
}
