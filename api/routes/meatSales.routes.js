// routes/meatSaleRoutes.js
import express from 'express';
import { recordMeatSale } from '../controllers/meatSalesController.js';

const meatSalesRouter = express.Router();

// Define the route for recording a new meat sale
meatSalesRouter.post('/add-meat-sales', recordMeatSale);

export default meatSalesRouter;
