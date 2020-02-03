import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';

const { JWT_SECRET } = config;

var jwtFromRequest = function (req: Request) {
    if (req && req.headers) {
        var token = req.headers['authorization'];
        return token;
    }

    return null;
};


export default function (request: Request, response: Response, next: NextFunction) {
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
