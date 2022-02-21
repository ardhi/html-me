const _ = require('lodash')
const fs = require('fs')

module.exports = function (name, props = {}) {
  props.option = props.option || {}
  let file = `${__dirname}/bootstrap5/${_.kebabCase(name)}.js`
  if (!fs.existsSync(file)) file = `${__dirname}/bootstrap5/_misc.js`
  props.tag = name
  props.option.compName = name
  return require(file)(props)
}
