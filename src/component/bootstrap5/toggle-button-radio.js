const toggleButton = require('./toggle-button')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.radio = true
  return toggleButton({ content, attrib, option })
}
