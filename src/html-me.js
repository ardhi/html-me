const _ = require('lodash')
const nl = '\r\n'

class HtmlMe {
  constructor ({ tag, content = [], attrib = {}, option = {} }) {
    this.option = option
    this.option.commonClass = this.option.commonClass || []
    if (_.isString(this.option.commonClass)) this.option.commonClass = [this.option.commonClass]
    this.option.defaultClass = this.option.defaultClass || []
    if (_.isString(this.option.defaultClass)) this.option.defaultClass = [this.option.defaultClass]
    this.option.omitted = this.option.omitted || []
    if (_.isString(this.option.omitted)) this.option.omitted = [this.option.omitted]
    this.tag = tag
    this.content = attrib.label || content
    this.content = _.isString(this.content) ? [this.content] : this.content
    if (!this.content) this.content = []
    this.attrib = _.cloneDeep(attrib)
    if (this.attrib.label) this.option.omitted.push('label')
    this.attrib.class = this.normalizeArray(this.attrib.class, {
      common: this.option.commonClass,
      default: this.option.defaultClass
    })
    this.attrib.style = this.normalizeObject(this.attrib.style, {
      common: this.option.commonStyle,
      default: this.option.defaultStyle
    })
    this.newLine = option.newLine || false
    this.enum = {
      noValue: ['readonly', 'multiple', 'disabled', 'selected', 'checked']
    }
    this.nl = nl
  }

  open () {
    const attrs = []
    this.sanitize()
    _.forOwn(_.omit(this.attrib, this.option.omitted), (v, k) => {
      if (_.isArray(v)) v = _.uniq(v).join(' ')
      if (_.isObject(v)) v = this.stringifyObject(v)
      k = _.kebabCase(_.trim(k))
      if (this.enum.noValue.includes(k)) attrs.push(k)
      else {
        if (!this.isSet(v)) return
        v = v + ''
        if (_.isEmpty(v)) return
        attrs.push(_.trim(`${k}="${_.trim(v)}"`))
      }
    })
    return `<${this.tag}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}${this.content.length === 0 ? '/>' : '>'}${this.newLine ? nl : ''}`
  }

  close () {
    return `</${this.tag}>${this.newLine ? nl : ''}`
  }

  write () {
    const result = []
    result.push(this.open())
    if (this.content.length > 0) {
      result.push(this.content.join(nl))
      result.push(this.close())
    }
    return result.join(this.newLine ? nl : '') + (this.newLine ? nl : '')
  }

  // helpers
  sanitize () {
  }

  generateId () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
  }

  isSet (value) {
    return ![null, undefined].includes(value)
  }

  stringifyObject (item) {
    const result = []
    _.forOwn(item, (v, k) => {
      let key = _.kebabCase(k)
      if (k[0] === '_') key = '--' + key
      result.push(`${key}: ${v}`)
    })
    return result.join('; ')
  }

  camelCaseKeys (item) {
    const result = {}
    _.forOwn(item, (v, k) => {
      result[_.camelCase(k)] = v
    })
    return result
  }

  normalizeArray (item = [], opts = {}) {
    opts.default = opts.default || []
    opts.common = opts.common || []
    if (_.isString(item)) item = _.map(item.split(' '), i => _.trim(i))
    if (!_.isEmpty(item)) opts.default = []
    return _.without(_.concat(opts.common, opts.default, item), null, undefined, '')
  }

  normalizeObject (item = {}, opts = {}) {
    opts.default = this.camelCaseKeys(opts.default) || {}
    opts.common = this.camelCaseKeys(opts.common) || {}
    if (_.isString(item)) {
      const obj = {}
      _.each(_.map(item.split(';'), i => _.trim(i)), v => {
        const pair = _.map(v.split(':'), i => _.trim(i))
        obj[pair[0]] = pair[1]
      })
      item = this.camelCaseKeys(obj)
    }
    item = _.merge(opts.default, item)
    item = _.merge(opts.common, item)
    return item
  }

  filterAttrib (key, filteredOpts = {}) {
    const filtered = {}
    const all = _.keys(this.attrib)
    const rest = []
    if (filteredOpts.asValueFor) {
      filtered[filteredOpts.asValueFor] = this.attrib[key]
    }
    _.forOwn(this.attrib, (v, k) => {
      const [name, ...parts] = _.kebabCase(k).split('-')
      if (name === key && parts.length > 0) {
        filtered[_.camelCase(parts.join('-'))] = v
      } else {
        rest.push(k)
      }
    })
    if (key === 'label' && this.attrib.id) filtered.for = this.attrib.id
    _.each(all, a => {
      if (!rest.includes(a)) delete this.attrib[a]
    })
    delete this.attrib[key]
    filtered.class = this.normalizeArray(filtered.class, filteredOpts.class)
    filtered.style = this.normalizeObject(filtered.style, filteredOpts.style)
    return filtered
  }

  check (key, strict) {
    const has = _.has(this.attrib, key)
    return strict ? (has && (this.enum[key] || []).includes(this.attrib[key])) : has
  }

  addToClass (key, prefix, strict) {
    if (!this.isSet(strict)) strict = true
    if (!this.check(key, strict)) return
    let item = prefix || ''
    if (this.attrib[key] !== true) item += (prefix ? '-' : '') + this.attrib[key]
    this.attrib.class.push(item)
    delete this.attrib[key]
  }

}

module.exports = HtmlMe