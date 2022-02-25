const Bs5 = require('./_class')
const navItem = require('./nav-item')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = option.commonClass || ['nav']
  const bs5 = new Bs5({ tag: 'ul', content, attrib, option })
  _.each(bs5.content, (c, idx) => {
    if (_.isString(c) && !c.startsWith('<')) bs5.content[idx] = navItem({ attrib: { label: c } })
    if (_.isPlainObject(c)) bs5.content[idx] = navItem({ attrib: c })
  })
  bs5.addToClass('align', 'justify-content')
  bs5.addToClass('kind', 'nav')
  bs5.addToClass('fill', 'nav')
  return bs5.write()
}
