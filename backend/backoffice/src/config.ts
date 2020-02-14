import envalid, { url } from 'envalid';
const { str, port } = envalid;

const params = {
	PORT: port({ default: 8080 }),
	ADMIN_LOGIN: str({ default: 'admin' }),
	ADMIN_PASSWORD: str({ default: 'admin' }),
	JWT_SECRET: str({ default: 'secret' }),
	MONGO_CONNECTION_STRING: url(),
	LOGIN_EXPIRE: str({ default: '7d' })
};

export default envalid.cleanEnv(process.env, params);
