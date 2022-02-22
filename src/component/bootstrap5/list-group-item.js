const Bs5 = require('./_class')
const badge = require('./badge')
const checkbox = require('./checkbox')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['list-group-item']
  const bs5 = new Bs5({ tag: 'li', content, attrib, option })
  if (bs5.getAttrib('action')) {
    bs5.setAttrib('tag', bs5.getAttrib('tag', 'a'))
    bs5.setAttribClass('list-group-item-action')
    if (bs5.getAttrib('tag') === 'a') bs5.setAttrib('href', bs5.getAttrib('href', '#'))
  }
  bs5.addToClass('color', 'list-group-item')
  const badgeAttrib = bs5.filterAttrib('badge', { asValueFor: 'label' })
  if (badgeAttrib.label) {
    bs5.setAttribClass(['d-flex', 'justify-content-between', 'align-items-center'])
    const badgeEl = badge({ attrib: badgeAttrib })
    bs5.content.push(badgeEl)
  }
  if (bs5.getAttrib('checkbox') || bs5.getAttrib('radio')) {
    bs5.setAttrib('tag', 'label')
    const type = bs5.getAttrib('radio') ? 'radio' : 'checkbox'
    const crAttrib = bs5.filterAttrib(type)
    crAttrib.noWrapper = true
    crAttrib.ariaLabel = bs5.content[0]
    crAttrib.class.push('me-1')
    const crEl = checkbox({ attrib: crAttrib, option: { radio: type === 'radio' } })
    bs5.content.unshift(crEl)
  }
  bs5.option.omitted = ['radio', 'checkbox']
  return bs5.write()
}
