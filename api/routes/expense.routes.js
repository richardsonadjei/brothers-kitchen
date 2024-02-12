import express from 'express';
import { createOtherConsumablesPurchase,getAllOtherConsumablesPurchasesWithinPeriod, recordBusinessAssetsPurchase, recordGasPurchase, recordIngredientPurchase, recordPlatesAndBowlsPurchase, viewAssetsPurchases, viewGasPurchases, viewIngredientPurchases, viewPlatesAndBowlsPurchases } from '../controllers/expense.controller.js';

const expenseRouter = express.Router();

// Route to record a new ingredient purchase
expenseRouter.post('/record-ingredient-purchase', recordIngredientPurchase);
expenseRouter.post('/gas-purchase', recordGasPurchase);
expenseRouter.post('/plates-purchase', recordPlatesAndBowlsPurchase);
expenseRouter.post('/business-assets-purchase', recordBusinessAssetsPurchase);
expenseRouter.get('/view-ingredient-purchases', viewIngredientPurchases);
expenseRouter.get('/view-gas-purchases', viewGasPurchases );
expenseRouter.get('/view-assets-purchases', viewAssetsPurchases );
expenseRouter.get('/view-bowls-purchases', viewPlatesAndBowlsPurchases );
expenseRouter.post('/add-other-consumables-purchases', createOtherConsumablesPurchase);
expenseRouter.get('/other-consumables-purchases', getAllOtherConsumablesPurchasesWithinPeriod);

export default expenseRouter;
