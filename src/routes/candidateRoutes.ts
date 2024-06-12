import express from 'express';
import { getProfile, updateProfile } from '../controllers/candidateController';

const router = express.Router();

router.get('/profile', getProfile);
router.post('/profile', updateProfile);
// other candidate routes...

export default router;
