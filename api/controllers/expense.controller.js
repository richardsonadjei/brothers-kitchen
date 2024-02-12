import CookingIngredientsPurchase from '../models/cookingIngredientsPurchase.model.js';

// Controller function to record a new ingredient purchase
const recordIngredientPurchase = async (req, res) => {
  try {
    // Extract data from the request body
    const { description, purchaseDate, recordedBy } = req.body;

    // Create a new CookingIngredientsPurchase instance
    const newIngredientPurchase = new CookingIngredientsPurchase({
      description,
      purchaseDate,
      recordedBy,
    });

    // Save the new ingredient purchase to the database
    await newIngredientPurchase.save();

    // Respond with success message and the recorded ingredient purchase
    res.status(201).json({
      success: true,
      message: 'Ingredient purchase recorded successfully',
      ingredientPurchase: newIngredientPurchase,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error recording ingredient purchase:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording ingredient purchase',
      error: error.message,
    });
  }
};

export { recordIngredientPurchase };


// controllers/gasPurchaseController.js
import GasPurchase from '../models/gasPurchase.model.js';

const recordGasPurchase = async (req, res) => {
  try {
    // Extract data from the request body
    const { amount, purchasedBy } = req.body;

    // Create a new GasPurchase instance
    const newGasPurchase = new GasPurchase({
      amount,
      purchasedBy,
    });

    // Save the gas purchase record
    await newGasPurchase.save();

    return res.status(201).json({ success: true, message: 'Gas purchase recorded successfully', data: newGasPurchase });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { recordGasPurchase };

// controllers/platesAndBowlsPurchase.controller.js
import PlatesAndBowlsPurchase from '../models/platesAndBowls.model.js';


const recordPlatesAndBowlsPurchase = async (req, res) => {
  try {
    // Extract data from the request body
    const { amount, purchasedBy, description } = req.body;

    // Create a new PlatesAndBowlsPurchase instance
    const newPlatesAndBowlsPurchase = new PlatesAndBowlsPurchase({
      amount,
      purchasedBy,
      description, // Include the description field
    });

    // Save the plates and bowls purchase record
    await newPlatesAndBowlsPurchase.save();

    return res.status(201).json({ success: true, message: 'Plates and bowls purchase recorded successfully', data: newPlatesAndBowlsPurchase });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { recordPlatesAndBowlsPurchase };


import BusinessAssetsPurchase from '../models/AssetsPurchase.model.js';

const recordBusinessAssetsPurchase = async (req, res) => {
  try {
    // Extract data from the request body
    const { amount, description, purchasedBy } = req.body;

    // Create a new BusinessAssetsPurchase instance
    const newBusinessAssetsPurchase = new BusinessAssetsPurchase({
      amount,
      description,
      purchasedBy,
    });

    // Save the business assets purchase record
    await newBusinessAssetsPurchase.save();

    return res.status(201).json({ success: true, message: 'Business assets purchase recorded successfully', data: newBusinessAssetsPurchase });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { recordBusinessAssetsPurchase };



// REPORTS
const viewIngredientPurchases = async (req, res) => {
  try {
    // Extract startDate and endDate from request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Fetch ingredient purchases within the specified period
    const ingredientPurchases = await CookingIngredientsPurchase.find({
      purchaseDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the retrieved ingredient purchases
    res.status(200).json({
      success: true,
      message: 'Ingredient purchases retrieved successfully',
      ingredientPurchases,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error retrieving ingredient purchases:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving ingredient purchases',
      error: error.message,
    });
  }
};

export { viewIngredientPurchases };


// controllers/gasPurchaseController.js

const viewGasPurchases = async (req, res) => {
  try {
    // Extract startDate and endDate from request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Fetch gas purchases within the specified period
    const gasPurchases = await GasPurchase.find({
      date: {  // Use the correct field name here
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the retrieved gas purchases
    res.status(200).json({
      success: true,
      message: 'Gas purchases retrieved successfully',
      gasPurchases,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error retrieving gas purchases:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving gas purchases',
      error: error.message,
    });
  }
};

export { viewGasPurchases };




const viewAssetsPurchases = async (req, res) => {
  try {
    // Extract startDate and endDate from request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Fetch assets purchases within the specified period
    const assetsPurchases = await BusinessAssetsPurchase.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the retrieved assets purchases
    res.status(200).json({
      success: true,
      message: 'Assets purchases retrieved successfully',
      assetsPurchases,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error retrieving assets purchases:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving assets purchases',
      error: error.message,
    });
  }
};

export { viewAssetsPurchases };




const viewPlatesAndBowlsPurchases = async (req, res) => {
  try {
    // Extract startDate and endDate from request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Fetch plates and bowls purchases within the specified period
    const platesAndBowlsPurchases = await PlatesAndBowlsPurchase.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the retrieved plates and bowls purchases
    res.status(200).json({
      success: true,
      message: 'Plates and bowls purchases retrieved successfully',
      platesAndBowlsPurchases,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error retrieving plates and bowls purchases:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving plates and bowls purchases',
      error: error.message,
    });
  }
};

export { viewPlatesAndBowlsPurchases };


// controllers/otherConsumablesPurchase.controller.js
import OtherConsumablesPurchase from '../models/otherConsumablesPurchase.model.js';

// Controller to create a new Other Consumables Purchase record
export const createOtherConsumablesPurchase = async (req, res) => {
  try {
    const newPurchase = new OtherConsumablesPurchase(req.body);
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all Other Consumables Purchase records within a particular period
export const getAllOtherConsumablesPurchasesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query OtherConsumablesPurchase records within the specified period
    const purchases = await OtherConsumablesPurchase.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


