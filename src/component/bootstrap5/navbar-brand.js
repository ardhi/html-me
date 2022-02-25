const misc = require('./_misc')
const image = require('./image')
const _ = require('lodash')

module.exports = function ({ attrib = {}, option = {} }) {
  if (!attrib.matched) return ''
  option.commonClass = ['navbar-brand']
  let item
  let imageEl
  attrib.href = attrib.href || '#'
  switch (attrib.type) {
    case 'text':
      attrib.class.push('mb-0', 'h1')
      item = misc({ tag: 'span', attrib: _.pick(attrib, ['text', 'class', 'style']), option })
      break
    case 'image':
      if (!_.isEmpty(attrib.label)) attrib.label = ' ' + attrib.label
      imageEl = image({ attrib: _.omit(attrib, ['href', 'type']) })
      item = misc({ tag: 'a', content: imageEl, attrib: _.pick(attrib, ['href', 'label', 'class', 'style']), option })
      break
    default:
      item = misc({ tag: 'a', attrib, option })
  }
  return item
}
