import mongoose from 'mongoose';

// Create a schema for income variation
const incomeVariationSchema = new mongoose.Schema({
  expectedSalesAmount: {
    type: Number,
    required: true,
  },
  actualSalesAmount: {
    type: Number,
    required: true,
  },
  meatIssueNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the IncomeVariation model based on the schema
const IncomeVariation = mongoose.model('IncomeVariation', incomeVariationSchema);

export default IncomeVariation;
