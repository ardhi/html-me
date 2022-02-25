const Bs5 = require('./_class')
const misc = require('./_misc')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['breadcrumb']
  const bs5 = new Bs5({ tag: 'nav', content, attrib, option })
  bs5.setAttrib('ariaLabel', 'breadcrumb')
  const listAttrib = bs5.filterAttrib('list', { class: { common: ['breadcrumb'] } })
  const itemAttrib = bs5.filterAttrib('item')
  const items = []
  _.each(bs5.content, (c, idx) => {
    const isActive = idx === bs5.content.length - 1
    if (_.isPlainObject(c)) {
      c = isActive ? c.text : misc({ tag: 'a', content: c.text, attrib: { href: c.href || '#' } })
    }
    const o = _.merge(_.cloneDeep(itemAttrib), { class: ['breadcrumb-item'] })
    if (isActive) {
      o.class.push('active')
      o.ariaCurrent = 'page'
    }
    items.push(misc({ tag: 'li', content: c, attrib: o }))
  })
  const listEl = misc({ tag: 'ol', content: items, attrib: listAttrib })
  bs5.content = [listEl]
  const divider = bs5.getAttrib('divider')
  if (divider) bs5.setAttrib('style._bsBreadcrumbDivider', divider.startsWith('url(') ? divider : `'${divider}'`)
  bs5.option.omitted.push('divider')
  return bs5.write()
}
