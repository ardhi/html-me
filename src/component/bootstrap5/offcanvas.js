const Bs5 = require('./_class')
const misc = require('./_misc')
const button = require('./button')
const _ = require('lodash')

const header = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option: { commonClass: ['offcanvas-header'] } })
  const titleAttrib = bs5.filterAttrib('title', { asValueFor: 'title' })
  const titleEl = misc({ tag: 'h5', content: titleAttrib.title || '&nbsp;', attrib: _.omit(titleAttrib, ['title']), option: { commonClass: ['offcanvas-title'] } })
  const closeAttrib = bs5.filterAttrib('close')
  closeAttrib.dataBsDismiss = 'offcanvas'
  closeAttrib.ariaLabel = 'Close'
  const closeEl = button({ attrib: closeAttrib, option: { commonClass: ['btn-close', 'text-reset'] } })
  bs5.content = [titleEl, closeEl]
  return bs5.write()
}

module.exports = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['offcanvas']
  attrib.id = attrib.id || ''
  attrib.align = attrib.placement || 'start'
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const bodyAttrib = bs5.filterAttrib('body')
  const bodyEl = misc({ tag: 'div', content, attrib: bodyAttrib, option: { commonClass: ['offcanvas-body'] } })
  const headerEl = header({ attrib: _.omit(attrib, ['id']) })
  if (bs5.getAttrib('backdrop') === false) {
    bs5.setAttrib('dataBsBackdrop', false)
    if (!bs5.isSet(bs5.getAttrib('bgScroll'))) bs5.setAttrib('bgScroll', true)
  }
  bs5.addToClass('align', 'offcanvas')
  bs5.setAttrib('dataBsScroll', bs5.getAttrib('bgScroll', false))
  bs5.setAttrib({
    tabIndex: -1,
    ariaLabelledby: bs5.getAttrib('id')
  })
  bs5.content = [headerEl, bodyEl]
  bs5.option.omitted.push('backdrop', 'bgScroll', 'placement')
  return bs5.write()
}
