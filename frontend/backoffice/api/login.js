const { Router } = require('express');

const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } = require('../config');
var jwt = require('jsonwebtoken');

const router = Router();

router.post('/', ({ body }, response) => {
	const { login, password } = body;
	if (ADMIN_LOGIN.split('|').find((a) => a === login) && password === ADMIN_PASSWORD) {
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

module.exports = router;
