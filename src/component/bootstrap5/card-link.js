const link = require('./link')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['card-link']
  return link({ content, attrib, option })
}
