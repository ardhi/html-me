const listGroupItem = require('./list-group-item')
const Bs5 = require('./_class')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['list-group']
  const bs5 = new Bs5({ tag: 'ul', content, attrib, option })
  bs5.addToClass('flush', 'list-group')
  bs5.addToClass('horizontal', 'list-group')
  if (bs5.getAttrib('numbered')) {
    bs5.setAttrib('tag', 'ol')
    bs5.addToClass('numbered', 'list-group')
  }
  _.each(bs5.content, (c, idx) => {
    if (_.isPlainObject(c)) bs5.content[idx] = listGroupItem({ content: c.content, attrib: _.omit(c, ['content']) })
  })
  return bs5.write()
}
