const input = require('./input')

module.exports = function ({ attrib = {}, option = {} }) {
  attrib.type = 'color'
  option.commonClass = ['form-control', 'form-control-color']
  return input({ attrib, option })
}
