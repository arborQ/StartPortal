import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } = config;

const router = Router();

router.get('/', (_: Request, response: Response) => response.send(`${ADMIN_LOGIN}/${ADMIN_PASSWORD}`));

router.post('/', (request: Request, response: Response) => {
	const { body } = request;
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
			token,
		});
	} else {
		response.status(400).send({ _error: 'Niepoprawny login lub hasło' });
	}
});

export default router;
