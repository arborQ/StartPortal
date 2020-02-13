import { Router } from 'express';
import login from './login.route';
import manufacturers from './manufacturers.route';

const router = Router();

router.use('/login', login);
router.use('/manufacturers', manufacturers);

export default router;
