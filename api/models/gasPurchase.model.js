// models/gasPurchase.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the GasPurchase schema
const gasPurchaseSchema = new Schema({
    gasPurchaseNumber: {
        type: String,
        unique: true,
      },
  category: {
    type: String,
    default: 'Gas Purchase'
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  purchasedBy: {
    type: String,
    required: true,
  },
},
{
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// Generate gasPurchaseNumber before saving
gasPurchaseSchema.pre('save', async function (next) {
  try {
    const lastRecord = await this.constructor.findOne({}, {}, { sort: { gasPurchaseNumber: -1 } });
    const lastGasPurchaseNumber = lastRecord && lastRecord.gasPurchaseNumber
      ? parseInt(lastRecord.gasPurchaseNumber.replace('GP', ''))
      : 0;

    const nextGasPurchaseNumber = lastGasPurchaseNumber + 1;
    this.gasPurchaseNumber = `GP${nextGasPurchaseNumber.toString().padStart(4, '0')}`;

    next();
  } catch (error) {
    next(error);
  }
});

// Create the GasPurchase model
const GasPurchase = mongoose.model('GasPurchase', gasPurchaseSchema);

export default GasPurchase;
