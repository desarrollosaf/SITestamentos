import { Router } from 'express';
import { generateToken } from '../controllers/auth';

const router = Router();

router.post('/api/token', generateToken);

export default router;
