import { Router } from 'express';
import {
  CreateProfile,
  DeleteProfile,
  GetProfile,
  UpdateProfile,
} from '../controllers/profile.controller';

const router = Router();

router.get('/me', GetProfile);
router.post('/create', CreateProfile);
router.put('/update/:id', UpdateProfile);
router.delete('/delete/:id', DeleteProfile);

export default router;
