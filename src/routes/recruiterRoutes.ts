import express from 'express';
import { createJob, getJobs } from '../controllers/recruiterController';

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', getJobs);
// other recruiter routes...

export default router;
