import express from 'express';
import { recordBusinessAssetsPurchase, recordGasPurchase, recordIngredientPurchase, recordPlatesAndBowlsPurchase, viewIngredientPurchases } from '../controllers/expense.controller.js';

const expenseRouter = express.Router();

// Route to record a new ingredient purchase
expenseRouter.post('/record-ingredient-purchase', recordIngredientPurchase);
expenseRouter.post('/gas-purchase', recordGasPurchase);
expenseRouter.post('/plates-purchase', recordPlatesAndBowlsPurchase);
expenseRouter.post('/business-assets-purchase', recordBusinessAssetsPurchase);
expenseRouter.get('/view-ingredient-purchases', viewIngredientPurchases);

export default expenseRouter;
