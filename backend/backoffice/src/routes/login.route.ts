import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } = config;

const router = Router();

router.post('/', ({ body }, response) => {
	const { login, password } = body;
	if (ADMIN_LOGIN.split('|').find((a: string) => a === login) && password === ADMIN_PASSWORD) {
		const token = jwt.sign(
			{
				login,
				authorized: true
			},
			JWT_SECRET,
			{ algorithm: 'HS512', expiresIn: '7d' }
		);
		response.send({
			login,
			authorized: true,
			token,
			JWT_SECRET
		});
	} else {
		response.status(400).send({
			ADMIN_LOGIN,
			ADMIN_PASSWORD,
			env: process.env
		});
	}
});

export default router;
