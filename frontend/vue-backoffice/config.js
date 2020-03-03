const envalid = require('envalid')
const { port, url } = envalid

const params = {
  PORT: port({ devDefault: 3000 })
}

const env = envalid.cleanEnv(process.env, params)

module.exports = env
