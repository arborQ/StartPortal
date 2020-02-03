import { Router } from 'express';
import isAuthorizedMiddleware from '../middlewares/isAuthorized';

const router = Router();

router.use(isAuthorizedMiddleware);

router.get('/', (_, response) => response.send({
    brands: []
}));


export default router;
