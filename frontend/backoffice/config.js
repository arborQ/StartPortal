const envalid = require('envalid');
const { port, url } = envalid;

const params = {
	PORT: port({ devDefault: 8080 }),
	PROXY_ACCOUNT: url({ devDefault: 'http://localhost:8080/api/**' })
};

const env = envalid.cleanEnv(process.env, params);

module.exports = env;