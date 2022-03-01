const Bs5 = require('./_class')
const misc = require('./_misc')
const button = require('./button')
const closeButton = require('./close-button')
const _ = require('lodash')

module.exports = function ({ content, attrib, option }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option: { commonClass: ['modal'] } })
  bs5.setAttrib('tabIndex', -1)
  bs5.setAttrib('id', bs5.getAttrib('id', bs5.generateId()))
  let footerEl
  const buttons = []
  _.each(bs5.getAttrib('buttons', []), b => {
    if (_.isPlainObject(b)) {
      if (b.dismiss) {
        b.dataBsDismiss = 'modal'
        delete b.dismiss
      }
      const btnEl = button({ content: b.label, attrib: _.omit(b, ['label'] ) })
      buttons.push(btnEl)
    } else if (!b.startsWith('<')) buttons.push(button({ content: b }))
    else buttons.push(b)
  })
  const headerAttr = bs5.filterAttrib('header')
  const titleAttrib = {}
  const titleEl = misc({ tag: 'h5', content: headerAttr.label || bs5.getAttrib('title', '&nbsp;'), attrib: titleAttrib, option: { commonClass: ['modal-title'] } })
  delete bs5.attrib.title
  const closeBtnEl = closeButton({ attrib: { dataBsDismiss: 'modal' }, option: { commonClass: [] } })
  const headerEl = misc({ tag: 'div', content: [titleEl, closeBtnEl], attrib: headerAttr, option: { commonClass: ['modal-header'] } })
  const bodyAttr = bs5.filterAttrib('body')
  const bodyEl = misc({ tag: 'div', content: bs5.content.join('\n'), attrib: bodyAttr, option: { commonClass: ['modal-body'] } })
  if (buttons.length > 0) {
    const footerAttr = bs5.filterAttrib('footer')
    footerEl = misc({ tag: 'div', content: buttons, attrib: footerAttr, option: { commonClass: ['modal-footer'] } })
  }
  const modalEl = misc({ tag: 'div', content: [headerEl, bodyEl, footerEl], option: { commonClass: ['modal-content'] } })
  const dialogEl = misc({ tag: 'div', content: modalEl, option: { commonClass: ['modal-dialog'] } })
  if (!bs5.getAttrib('trigger')) return misc({ tag: 'div', content: dialogEl, attrib: bs5.attrib, option: { commonClass: ['modal'] } })
  const triggerAttrib = bs5.filterAttrib('trigger', { asValueFor: 'label' })
  triggerAttrib.dataBsToggle = 'modal'
  triggerAttrib.dataBsTarget = '#' + bs5.getAttrib('id')
  const triggerEl = button({ content: triggerAttrib.label, attrib: _.omit(triggerAttrib, ['label']) })
  bs5.setAttrib('ariaHidden', true)
  bs5.setAttribClass('fade')
  if (bs5.getAttrib('static')) {
    bs5.setAttrib('dataBsBackdrop', 'static')
    bs5.setAttrib('dataBsKeyboard', false)
  }
  const wrapperEl = misc({ tag: 'div', content: dialogEl, attrib: bs5.attrib, option: { commonClass: ['modal'] } })
  return `${triggerEl}\n${wrapperEl}`
}
