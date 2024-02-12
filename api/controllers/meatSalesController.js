// controllers/meatSaleController.js
import MeatSale from '../models/meatSales.model.js';


export const recordMeatSales = async (req, res) => {
  try {
    const { sales, recordedBy } = req.body;

    // Parse unitPrice and quantity to numbers for each sale
    const parsedSales = sales.map(sale => ({
      materialName: sale.materialName,
      unitPrice: parseFloat(sale.unitPrice),
      quantity: parseInt(sale.quantity),
    }));

    // Create a new meat sales instance with recordedBy
    const newMeatSales = new MeatSales({ 
      sales: parsedSales,
      recordedBy: recordedBy // Assign the recordedBy value
    });
    
    // Save the new meat sales record
    await newMeatSales.save();
    
    res.status(201).json(newMeatSales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const viewAllMeatSalesToday = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const salesToday = await MeatSales.find({
      salesDate: { $gte: startOfToday, $lte: endOfToday }
    });

    res.status(200).json(salesToday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const viewAllMeatSalesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const salesWithinPeriod = await MeatSales.find({
      salesDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    res.status(200).json(salesWithinPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Import necessary modules and models
import IncomeVariation from '../models/incomeVariation.model.js';
import MeatSales from '../models/meatSales.model.js';

// Controller to create a new income variation record
export const createIncomeVariation = async (req, res) => {
  try {
    const { expectedSalesAmount, actualSalesAmount, meatIssueNumber } = req.body;

    // Create a new income variation record
    const newIncomeVariation = new IncomeVariation({
      expectedSalesAmount,
      actualSalesAmount,
      meatIssueNumber,
    });

    // Save the new record to the database
    await newIncomeVariation.save();

    res.status(201).json({
      success: true,
      data: newIncomeVariation,
      message: 'Income variation record created successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to view all income variation records
export const viewAllIncomeVariations = async (req, res) => {
  try {
    // Fetch all income variation records
    const allIncomeVariations = await IncomeVariation.find();

    return res.status(200).json({ success: true, data: allIncomeVariations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};
