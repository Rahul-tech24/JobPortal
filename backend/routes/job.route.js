import express from 'express';
import { postJob, getJob, getJobs, getJobsPostedByUser, deleteJob, updateJob } from '../controllers/job.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', isAuthenticated, postJob);
router.get('/', isAuthenticated, getJobs);
router.get('/my-jobs', isAuthenticated, getJobsPostedByUser);
router.get('/:id', isAuthenticated, getJob);
router.put('/:id', isAuthenticated, updateJob);
router.delete('/:id', isAuthenticated, deleteJob);

export default router;
