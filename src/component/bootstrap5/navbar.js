const Bs5 = require('./_class')
const misc = require('./_misc')
const brand = require('./navbar-brand')
const toggler = require('./navbar-toggler')
const container = require('./navbar-container')
const navItem = require('./nav-item')
const _ = require('lodash')

const wrapper = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['collapse', 'navbar-collapse']
  const navs = []
  const newContent = []
  _.each(content, (c, idx) => {
    if (_.isPlainObject(c)) {
      if (!_.has(c, 'type')) c.type = 'nav'
      switch (c.type) {
        case 'nav':
          navs.push(navItem({ content: c.text, attrib: _.omit(c, ['text', 'label']) }))
          break
        case 'text':
          newContent.push(misc({ tag: 'span', content: c.text, attrib: _.omit(c, ['text', 'label']), option: { commonClass: ['navbar-text'] } }))
          break
      }
    } else {
      if (c.startsWith('<')) {
        // TODO: detect with cheerio
        newContent.push(c)
      } else newContent.push(misc({ tag: 'span', content: c, option: { commonClass: ['navbar-text'] } }))
    }
  })
  if (navs.length > 0) newContent.unshift(misc({ tag: 'ul', content: navs, option: { commonClass: ['navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0'] } }))
  return misc({ tag: 'div', content: newContent, attrib, option })
}

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['navbar']
  const bs5 = new Bs5({ tag: 'nav', attrib, option })
  if (bs5.getAttrib('dark')) bs5.addToClass('dark', 'navbar')
  else bs5.attrib.class.push('navbar-light')
  bs5.addToClass('color', 'bg')
  bs5.setAttrib('expand', bs5.getAttrib('expand', true))
  if (bs5.getAttrib('expand')) bs5.addToClass('expand', 'navbar-expand')
  else delete bs5.attrib.expand
  if (bs5.getAttrib('fixed')) bs5.addToClass('fixed', 'fixed')
  else if (bs5.getAttrib('sticky')) bs5.addToClass('sticky', 'sticky')

  const brandAttrib = bs5.filterAttrib('brand', { asValueFor: 'text' })
  const brandEl = brand({ attrib: brandAttrib })

  const containerAttrib = bs5.filterAttrib('container', { asValueFor: 'expand' })

  const wrapperAttrib = bs5.filterAttrib('wrapper')
  wrapperAttrib.id = wrapperAttrib.id || bs5.generateId()
  const wrapperEl = wrapper({ content, attrib: wrapperAttrib })

  const togglerAttrib = bs5.filterAttrib('toggler')
  togglerAttrib.dataBsTarget = '#' + wrapperAttrib.id
  const togglerEl = toggler({ attrib: togglerAttrib })

  const containerEl = container({ content: [brandEl, togglerEl, wrapperEl], attrib: containerAttrib })

  bs5.content = [containerEl]
  bs5.option.omitted.push('brand', 'wrapperId')
  return bs5.write()
}
