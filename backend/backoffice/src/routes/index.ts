import { Router } from 'express';
import login from './login.route';
import cars from './brands.route';

const router = Router();

router.use('/login', login);
router.use('/brands', cars);

export default router;
