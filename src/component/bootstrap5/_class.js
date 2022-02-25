const _ = require('lodash')
const HtmlMe = require('../../html-me')

class Bootstrap5 extends HtmlMe {
  constructor (params) {
    super(params)
    this.attribValues = _.merge(this.attribValues, {
      rounded: [true, 'pill', 'circle'],
      nowrap: [true],
      flush: [true],
      numbered: [true],
      horizontal: [true],
      color: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'body', 'white', 'transparent'],
      breakpoint: ['sm', 'md', 'lg', 'xl', 'xxl'],
      position: ['absolute', 'relative', 'static', 'fixed', 'sticky'],
      align: ['top', 'bottom', 'start', 'end', 'center'],
      overflow: ['auto', 'hidden', 'visible', 'scroll'],
      float: ['start', 'end', 'none'],
      border: [true, 'top', 'end', 'bottom', 'start'],
      size: ['sm', 'md', 'lg', 'xl'],
      border: ['light'],
      translate: ['middle'],
      collapse: ['horizontal'],
      dropDir: [true, 'dropup', 'dropend', 'dropstart'],
      responsive: ['fluid'],
      thumbnail: [true],
      fade: [true],
      dark: [true],
      light: [true],
      disabled: [true],
      active: [true],
      striped: [true],
      animated: [true],
      fill: [true, 'justified'],
      kind: ['tabs', 'pills'],
      fixed: ['top', 'bottom'],
      sticky: ['top', 'bottom']
    })
    this.attribValues.expand = _.concat([true, 'fluid', ], this.attribValues.breakpoint)
  }

  sanitize () {
    super.sanitize()
    const items = _.without(_.keys(this.attribValues), 'noValue')
    _.each(items, item => delete this.attrib[item])
  }

  normalizeColWidth (w) {
    w = w + ''
    if (w.startsWith('col')) return w
    if (w.includes('-')) return `col-${w}`
    return `col-sm-${w}`
  }

}

module.exports = Bootstrap5
