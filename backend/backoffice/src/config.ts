import envalid, { url } from 'envalid';
const { str, port } = envalid;

const params = {
	PORT: port({ devDefault: 4000 }),
	ADMIN_LOGIN: str({ devDefault: 'admin' }),
	ADMIN_PASSWORD: str({ devDefault: 'admin' }),
	JWT_SECRET: str({ devDefault: 'secret' }),
	MONGO_CONNECTION_STRING: url(),
	LOGIN_EXPIRE: str({ devDefault: '7d' })
};

export default envalid.cleanEnv(process.env, params);
