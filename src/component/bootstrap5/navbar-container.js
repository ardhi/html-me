const misc = require('./_misc')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.onOpen = function () {
    let expand = 'container'
    if (this.attribValues.breakpoint.includes(attrib.expand)) expand += '-' + attrib.expand
    else if (attrib.expand === true) {}
    else expand += '-fluid'
    this.attrib.class.push(expand)
    delete this.attrib.expand
  }
  return misc({ tag: 'div', content, attrib, option })
}
