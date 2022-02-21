const checkbox = require('./checkbox')

module.exports = function ({ content, attrib = {}, option = {} }) {
  attrib.wrapperClass = attrib.wrapperClass || []
  attrib.wrapperClass.push('form-switch')
  return checkbox({ content, attrib, option })
}
