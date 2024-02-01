// routes/meatSaleRoutes.js
import express from 'express';
import { recordMeatSale, viewAllMeatSalesToday, viewMeatSalesByPeriod } from '../controllers/meatSalesController.js';

const meatSalesRouter = express.Router();

// Define the route for recording a new meat sale
meatSalesRouter.post('/add-meat-sales', recordMeatSale);
meatSalesRouter.get('/view-all-meat-sales-today', viewAllMeatSalesToday);
meatSalesRouter.get('/view-meat-sales-by-period', viewMeatSalesByPeriod);

export default meatSalesRouter;
