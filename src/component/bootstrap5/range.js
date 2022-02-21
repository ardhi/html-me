const input = require('./input')

module.exports = function ({ attrib = {}, option = {} }) {
  option.commonClass = ['form-range']
  attrib.type = 'range'
  return input({ attrib, option })
}
