const _ = require('lodash')
const HtmlMe = require('../../html-me')

class Bootstrap5 extends HtmlMe {
  constructor (params) {
    super(params)
    this.enum = _.merge(this.enum, {
      rounded: [true, 'pill', 'circle'],
      nowrap: [true],
      color: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      breakpoint: ['sm', 'md', 'lg', 'xl', 'xxl'],
      position: ['absolute', 'relative', 'static', 'fixed', 'sticky'],
      size: ['md', 'lg'],
      border: ['light'],
      translate: ['middle'],
      collapse: ['horizontal']
    })
  }

  sanitize () {
    const items = _.without(_.keys(this.enum), 'noValue')
    _.each(items, item => delete this.attrib[item])
  }

  normalizeWidth (w) {
    w = w + ''
    if (w.startsWith('col')) return w
    if (w.includes('-')) return `col-${w}`
    return `col-sm-${w}`
  }

}

module.exports = Bootstrap5
