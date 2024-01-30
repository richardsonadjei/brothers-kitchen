// controllers/meatSaleController.js
import MeatSale from '../models/meatSales.model.js';

const recordMeatSale = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      sales, // Array of meat types with quantity
      recordedBy,
      paymentMethod, // Optional: If not provided, 'cash' will be used as the default
    } = req.body;

    // Create a new MeatSale instance
    const newMeatSale = new MeatSale({
      meats: sales.map(sale => ({
        type: sale.meatType,
        quantity: sale.quantity || 1, // Default to 1 if quantity is not provided
      })),
      recordedBy,
      paymentMethod,
    });

    // Save the meat sale record
    await newMeatSale.save();

    return res.status(201).json({ success: true, message: 'Meat sale recorded successfully', data: newMeatSale });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { recordMeatSale };
