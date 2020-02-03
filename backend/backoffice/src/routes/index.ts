import { Router } from 'express';
import login from './login.route';
import cars from './cars.route';

const router = Router();

router.use('/login', login);
router.use('/cars', cars);

export default router;
