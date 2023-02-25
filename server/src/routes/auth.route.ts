import { RegisterUser, LoginUser } from '../controllers/auth.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

export default router;
