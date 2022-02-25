const Bs5 = require('./_class')
const misc = require('./_misc')
const _ = require('lodash')

const bar = function ({ content, attrib = {}, option = {} }) {
  option.commonClass = ['progress-bar']
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  const values = bs5.normalizeUnit(bs5.content[0] || bs5.attrib.value)
  const value = Number(values[0])
  const min = 0
  const max = 100
  bs5.setAttrib({
    role: 'progressbar',
    ariaValuenow: value,
    ariaValuemin: min,
    ariaValuemax: max
  })
  bs5.setAttrib('style.width', `${value}%`)
  bs5.addToClass('striped', 'progress-bar')
  bs5.addToClass('color', 'bg')
  bs5.addToClass('animated', 'progress-bar')
  bs5.content = [bs5.getAttrib('showValue') ? (value + '%') : '']
  bs5.option.omitted.push('value', 'showValue', 'multi', 'height', 'gutter')
  return bs5.write()
}

module.exports = function ({ content, attrib = {}, option = {} }) {
  const bs5 = new Bs5({ tag: 'div', content, attrib, option })
  let bars = []
  const gutter = bs5.getAttrib('gutter', 'mb-2')
  const barAttrib = _.cloneDeep(bs5.attrib)
  if (gutter && !bs5.getAttrib('multi')) barAttrib.class.push(gutter)
  if (bs5.getAttrib('height')) barAttrib.style.height = bs5.getAttrib('height')
  _.each(bs5.content, (c, idx) => {
    let barEl
    if (_.isString(c) || _.isNumber(c)) barEl = bar({ content: c })
    else barEl = bar({ attrib: c })
    bars.push(bs5.getAttrib('multi') ? barEl : misc({ tag: 'div', content: barEl, attrib: barAttrib, option: { commonClass: ['progress'] } }))
  })
  bars = bars.join('\n')
  if (!bs5.getAttrib('multi')) return bars
  delete attrib.multi
  delete attrib.height
  return misc({ tag: 'div', content: bars, attrib, option: { commonClass: ['progress'] } })
}
