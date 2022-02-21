const Bs5 = require('./_class')
const button = require('./button')

module.exports = function ({ content, attrib = {}, option = {} }) {
  attrib.ariaLabel = attrib.ariaLabel || 'Close'
  attrib.class = attrib.class || []
  if (attrib.white) attrib.class.push('btn-close-white')
  option.defaultClass = ['btn-close']
  option.omitted = option.omitted || []
  option.omitted.push('white')
  return button({ content, attrib, option })
}
