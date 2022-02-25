const misc = require('./_misc')
const button = require('./button')

module.exports = function ({ attrib = {}, option = {} }) {
  const content = misc({ tag: 'span', content: '', attrib: { class: 'navbar-toggler-icon' } })
  option.commonClass = ['navbar-toggler']
  attrib.dataBsToggle = 'collapse'
  attrib.ariaControls = 'navbarSupportedContent'
  attrib.ariaExpanded = false
  attrib.ariaLabel = 'Toggle navigation'
  return button({ content, attrib, option })
}
