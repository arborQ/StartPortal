const envalid = require('envalid');
const { str, port } = envalid;

const params = {
	PORT: port({ devDefault: 8080 }),
	ADMIN_LOGIN: str({ devDefault: 'admin' }),
	ADMIN_PASSWORD: str({ devDefault: 'admin' }),
	JWT_SECRET: str({ devDefault: 'secret' }),
};

const env = envalid.cleanEnv(process.env, params);

module.exports = env;