const checkbox = require('./checkbox')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.radio = true
  return checkbox({ content, attrib, option })
}
