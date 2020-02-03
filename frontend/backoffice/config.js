const envalid = require('envalid');
const { port } = envalid;

const params = {
	PORT: port({ devDefault: 8080 })
};

const env = envalid.cleanEnv(process.env, params);

module.exports = env;