import express from 'express';
import { createBulkMeatIssue, getBulkMeatIssuesInPeriod } from '../controllers/bulkMeatIssue.controller.js'; // Adjust the path based on your project structure

const router = express.Router();

// Route to create a new bulk meat issue
router.post('/create-bulk-meat-issue', createBulkMeatIssue);
router.get('/get-bulk-meat-issues-in-period', getBulkMeatIssuesInPeriod);

export default router;
