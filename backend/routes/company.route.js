import express from 'express';
import {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany
} from '../controllers/company.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', isAuthenticated, getCompanies);
router.get('/:id', isAuthenticated, getCompany);
router.post('/', isAuthenticated, createCompany);
router.put('/:id', isAuthenticated, updateCompany);
router.delete('/:id', isAuthenticated, deleteCompany);

export default router;
