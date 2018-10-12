const baseConfig = require('./webpack.config.base')


const config = Object.assign(baseConfig, {
  mode: 'production',
})


module.exports = config
