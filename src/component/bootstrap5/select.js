const Bs5 = require('./_class')
const bs5Option = require('./option')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = option.commonClass || ['form-select']
  _.each(content, (c, idx) => {
    if (_.isPlainObject(c)) content[idx] = bs5Option({ attrib: c })
  })
  const bs5 = new Bs5({ tag: 'select', content, attrib, option })
  bs5.addToClass('size', 'form-select')
  return bs5.write()
}
