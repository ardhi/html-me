const Bs5 = require('./_class')
const _ = require('lodash')
const misc = require('./_misc')
const cheerio = require('cheerio')
const wrapper = ['div', 'img', 'p']
const button = require('./button')

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['carousel', 'slide']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const id = bs5.generateId()
  bs5.setAttrib('id', bs5.getAttrib('id', id))
  bs5.setAttrib('dataBsRide', 'carousel')
  const innerAttrib = bs5.filterAttrib('inner', { class: { common: ['carousel-inner', 'h-100'] } })
  const itemAttrib = bs5.filterAttrib('item', { class: { common: ['carousel-item', 'h-100'] } })
  if (!_.has(itemAttrib, 'active')) itemAttrib.active = 0
  _.each(bs5.content, (c, idx) => {
    let newAttrib = _.omit(_.cloneDeep(itemAttrib), ['active'])
    let newContent = c
    if (_.isPlainObject(c)) {
      newAttrib = _.merge(_.omit(c, ['content']), itemAttrib)
      newContent = c.content
    }
    let hasWrapper = false
    _.each(wrapper, w => {
      if (newContent.startsWith(`<${w}`)) hasWrapper = true
    })
    if (!hasWrapper) newContent = `<div>${newContent}</div>`
    const $ = cheerio.load(newContent, null, false)
    const selector = _.map(wrapper, w => `${w}:first`).join(',')
    $(selector).addClass('d-block w-100 h-100')
    newContent = $.html()
    // has delay?
    let delay = _.get(bs5, `attrib.delays.${idx}`)
    if (delay !== false) newAttrib.dataBsInterval = delay
    // has caption?
    let caption = _.get(bs5, `attrib.captions.${idx}`)
    if (_.isPlainObject(caption)) {
      const title = misc({ tag: 'h5', content: caption.title })
      const description = misc({ tag: 'p', content: caption.description })
      caption = `${title}\n${description}`
    } else if (_.isString(caption) && !caption.startsWith('<')) caption = `<p>${caption}</p>`
    if (caption) caption = misc({ tag: 'div', content: caption, attrib: {}, option: { commonClass: ['carousel-caption', 'd-none', 'd-md-block'] } })
    if (caption) newContent += '\n' + caption

    const itemEl = new Bs5({ tag: 'div', attrib: newAttrib, content: newContent })
    if (itemAttrib.active === idx) itemEl.setAttribClass('active')
    bs5.content[idx] = itemEl.write()
  })
  const innerEl = new Bs5({ tag: 'div', attrib: innerAttrib, content: bs5.content })
  const indcAttrib = bs5.filterAttrib('indicator')
  bs5.content = []
  if (indcAttrib.matched) {
    const indcEl = new Bs5({ tag: 'div', option: { commonClass: ['carousel-indicators'] } })
    _.each(content, (c, idx) => {
      const attr = { dataBsTarget: `#${id}`, dataBsSlideTo: idx, ariaLabel: `Silide ${idx + 1}` }
      if (itemAttrib.active === idx) {
        attr.class = 'active'
        attr.ariaCurrent = 'true'
      }
      indcEl.content.push(button({ attrib: attr, option: { commonClass: [] } }))
    })
    bs5.content.push(indcEl.write())
  }
  bs5.content.push(innerEl.write())
  const btnAttrib = bs5.filterAttrib('button')
  if (btnAttrib.matched) {
    btnAttrib.dataBsTarget = `#${id}`
    _.each(['prev', 'next'], v => {
      const bc1 = misc({ tag: 'span', attrib: { ariaHidden: 'true' }, option: { commonClass: [`carousel-control-${v}-icon`] } })
      const bc2 = misc({ content: v, tag: 'span', attrib: { ariaHidden: 'true' }, option: { commonClass: ['visually-hidden'] } })
      const b = button({ content: [bc1, bc2], attrib: _.merge({ dataBsSlide: v }, btnAttrib), option: { commonClass: `carousel-control-${v}` } })
      bs5.content.push(b)
    })
  }
  bs5.addToClass('fade', 'carousel')
  // misc
  if (bs5.getAttrib('height')) bs5.setAttrib('style.height', bs5.getAttrib('height'))
  if (bs5.getAttrib('autoPlay') === false) bs5.setAttrib('dataBsInterval', false)
  if (bs5.getAttrib('touch') === false) bs5.setAttrib('dataBsTouch', false)
  bs5.addToClass('dark', 'carousel')
  bs5.option.omitted.push('height', 'captions', 'delays', 'autoPlay', 'touch')
  return bs5.write()
}
