import envalid from 'envalid';
const { str, port, url } = envalid;

const params = {
	PORT: port({ devDefault: 8080 }),
	ADMIN_LOGIN: str({ devDefault: 'admin' }),
	ADMIN_PASSWORD: str({ devDefault: 'admin' }),
	JWT_SECRET: str({ devDefault: 'secret' })
};

export default envalid.cleanEnv(process.env, params);
