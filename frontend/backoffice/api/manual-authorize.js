var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

var jwtFromRequest = function (req) {
    if (req && req.headers) {
        var token = req.headers['authorization'];
        return token;
    }

    return null;
};


module.exports = function (request, response, next) {
    const token = jwtFromRequest(request);
    if (!!token) {
        jwt.verify(token, JWT_SECRET, { algorithms: ['HS512'] }, (err, decoded) => {
            if (!!err) {
                response.status(400).send({ err });
            } else {
                next();
            }
        });
    } else {
        response.status(401).send({ errorMessage: 'Not authorized' });
    }
};