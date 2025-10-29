import express from 'express';
import { 
    applyForJob, 
    getMyApplications, 
    getJobApplications, 
    updateApplicationStatus, 
    deleteApplication 
} from '../controllers/application.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Apply for a job
router.post('/apply/:id', isAuthenticated, applyForJob);

// Get my applications (for job seekers)
router.get('/my-applications', isAuthenticated, getMyApplications);

// Get applications for a specific job (for recruiters)
router.get('/job/:id', isAuthenticated, getJobApplications);

// Update application status (for recruiters)
router.put('/:id/status', isAuthenticated, updateApplicationStatus);

// Delete application (for job seekers)
router.delete('/:id', isAuthenticated, deleteApplication);

export default router;