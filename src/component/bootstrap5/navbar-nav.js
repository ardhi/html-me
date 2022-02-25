const Bs5 = require('./_class')
const misc = require('./_misc')
const navItem = require('./nav-item')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['navbar-nav']
  const bs5 = new Bs5({ tag: 'ul', content, attrib, option })
  _.each(bs5.content, (c, idx) => {
    if (_.isPlainObject(c)) bs5.content[idx] = navItem({ content: c.label, attrib: _.omit(c, ['content']) })
  })
  const wrapperAttrib = { id: bs5.attrib.id }
  delete bs5.attrib.id
  return misc({ tag: 'div', content: [bs5.write()], attrib: wrapperAttrib, option: { commonClass: ['collapse', 'navbar-collapse'] } })
}
