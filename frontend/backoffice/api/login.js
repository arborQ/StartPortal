const { Router } = require('express');

const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } = require('../config');
var jwt = require('jsonwebtoken');

const router = Router();

// var publicKEY  = fs.readFileSync('../cert/jwtRS256.key.pub', 'utf8');

router.post('/', ({ body }, response) => {
    // konopka.mateusz1989@gmail.com
    const { login, password } = body;
    if (ADMIN_LOGIN.split('|').find((a) => a === login) && password === ADMIN_PASSWORD) {

        const token = jwt.sign({
            login,
            authorized: true,
        }, JWT_SECRET, { algorithm: 'HS512', expiresIn: "7d"});
        response.send({
            login,
            authorized: true,
            token
        })
    } else {
        response.status(400).send({
            ADMIN_LOGIN, ADMIN_PASSWORD
        });
    }
});

module.exports = router;