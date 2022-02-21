const Bs5 = require('./_class')
const closeButton = require('./close-button')
const icon = require('./icon')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['alert']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  bs5.attrib.role = 'alert'
  if (bs5.attrib.dismissible) {
    bs5.attrib.class.push('alert-dismissible fade show')
    bs5.content.push(closeButton({ attrib: { dataBsDismiss: 'alert' } }))
  }
  if (bs5.attrib.icon) {
    iconEl = icon({ content: bs5.attrib.icon })
    bs5.content.unshift(iconEl)
  }
  bs5.addToClass('color', 'alert')
  bs5.option.omitted.push('dismissable', 'icon')

  return bs5.write()
}
