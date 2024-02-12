import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const meatSalesSchema = new Schema({
  meatSalesNumber: {
    type: String,
    unique: true
  },
  sales: [{
    materialName: {
      type: String,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
    }
  }],
  grandTotal: {
    type: Number,
  },
  salesDate: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  recordedBy: {
    type: String, // Assuming recordedBy is a string field
    required: true // Adjust this as needed
  }
});

// Middleware to auto-generate the meat sales number and calculate total prices
meatSalesSchema.pre('save', async function (next) {
  if (!this.meatSalesNumber) {
    const lastPurchase = await this.constructor.findOne({}, {}, { sort: { 'timestamp': -1 } });
    if (lastPurchase) {
      const lastMeatSalesNumber = parseInt(lastPurchase.meatSalesNumber.slice(2)); // Extract the numeric part
      this.meatSalesNumber = `MS${(lastMeatSalesNumber + 1).toString().padStart(4, '0')}`; // Increment the numeric part
    } else {
      this.meatSalesNumber = 'MS0001'; // If no previous purchase exists, start with MS0001
    }
  }

  // Calculate total prices and grand total
  let grandTotal = 0;
  this.sales.forEach((sale) => {
    sale.totalPrice = sale.unitPrice * sale.quantity;
    grandTotal += sale.totalPrice;
  });
  this.grandTotal = grandTotal;

  next();
});

const MeatSales = model('MeatSales', meatSalesSchema);

export default MeatSales;
