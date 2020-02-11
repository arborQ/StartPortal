import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } = process.env;

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void> {
    const { body } = request;
    const { login, password } = body;
    if (ADMIN_LOGIN.split('|').find((a: string) => a === login) && password === ADMIN_PASSWORD) {
        const token = sign(
            {
                login,
                authorized: true
            },
            JWT_SECRET,
            { algorithm: 'HS512', expiresIn: '7d' }
        );
        context.res = {
            body: {
                login,
                token,
            }
        };
    } else {
        context.res = {
            status: 400,
            body : { error: 'unknown login' }
        };
    }
};

export default httpTrigger;
