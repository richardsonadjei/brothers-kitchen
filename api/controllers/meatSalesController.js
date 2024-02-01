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



const viewAllMeatSalesToday = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    // Find all meat sales records for today
    const salesToday = await MeatSale.find({
      createdAt: { $gte: currentDate, $lt: new Date(currentDate.getTime() + 86400000) }, // 86400000 milliseconds in a day
    });

    return res.status(200).json({ success: true, data: salesToday });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { viewAllMeatSalesToday };


const viewMeatSalesByPeriod = async (req, res) => {
  try {
    // Extract data from the request query
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Find all meat sales records within the specified period
    const salesByPeriod = await MeatSale.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    return res.status(200).json({ success: true, data: salesByPeriod });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { viewMeatSalesByPeriod };

