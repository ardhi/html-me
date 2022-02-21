const Bs5 = require('./_class')
const misc = require('./_misc')
const button = require('./button')
const _ = require('lodash')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['accordion']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const baseId = bs5.generateId()
  bs5.attrib.id = bs5.attrib.id || `${baseId}-main`
  _.each(bs5.content, (c, idx) => {
    const counter = idx + 1
    let title
    let cnt
    let collapsed = true
    if (_.isPlainObject(c)) {
      [title, collapsed, cnt] = c
    } else {
      title = _.get(bs5.attrib, `headings.${idx}.title`)
      if (!title) title = _.get(bs5.attrib, `titles.${idx}`)
      if (!title) title = _.get(bs5.attrib, `titles.${idx}`)
      if (!title) title = `Item ${counter}`
      collapsed = _.get(bs5.attrib, `headings.${idx}.collapsed`, true)
      cnt = c
    }
    const btnAttrib = {
      class: collapsed ? 'collapsed' : '',
      ariaExpanded: collapsed ? 'true' : 'false',
      ariaControls: `${baseId}-b-${counter}`,
      dataBsToggle: 'collapse',
      dataBsTarget: `#${baseId}-b-${counter}`
    }
    const btnEl = button({ content: title, attrib: btnAttrib, option: { commonClass: ['accordion-button'] } })
    const headEl = misc({ tag: 'h2', content: btnEl, attrib: { id: `${baseId}-h-${counter}` }, option: { commonClass: ['accordion-header'] } })
    const body = misc({ tag: 'div', content: cnt, option: { commonClass: ['accordion-body'] } })
    const bodyAttr = {
      class: `accordion-collapse collapse${collapsed ? '' : ' show'}`,
      id: `${baseId}-b-${counter}`,
      ariaLabelledby: `${baseId}-h-${counter}`
    }
    if (bs5.attrib.toggle) bodyAttr.dataBsParent = `#${bs5.attrib.id}`
    const bodyEl = misc({ tag: 'div', content: body, attrib: bodyAttr })
    const itemEl = misc({ tag: 'div', content: [headEl, bodyEl], option: { commonClass: ['accordion-item'] } })
    bs5.content[idx] = itemEl
  })
  if (bs5.attrib.flush) bs5.attrib.class.push('accordion-flush')
  bs5.option.omitted.push('flush', 'headings', 'titles', 'toggle')

  return bs5.write()
}
