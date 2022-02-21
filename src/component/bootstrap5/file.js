const input = require('./input')

module.exports = function ({ attrib = {}, option = {} }) {
  attrib.type = 'file'
  return input({ attrib, option })
}
