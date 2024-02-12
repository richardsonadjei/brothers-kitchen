// models/otherConsumablesPurchase.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the OtherConsumablesPurchase schema
const otherConsumablesPurchaseSchema = new Schema({
    otherConsumablesPurchaseNumber: {
        type: String,
        unique: true,
    },
    category: {
        type: String,
        default: 'Other Consumables Purchase',
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
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

// Generate otherConsumablesPurchaseNumber before saving
otherConsumablesPurchaseSchema.pre('save', async function (next) {
    try {
        const lastRecord = await this.constructor.findOne({}, {}, { sort: { otherConsumablesPurchaseNumber: -1 } });
        const lastOtherConsumablesPurchaseNumber = lastRecord && lastRecord.otherConsumablesPurchaseNumber
            ? parseInt(lastRecord.otherConsumablesPurchaseNumber.replace('OC', ''))
            : 0;

        const nextOtherConsumablesPurchaseNumber = lastOtherConsumablesPurchaseNumber + 1;
        this.otherConsumablesPurchaseNumber = `OC${nextOtherConsumablesPurchaseNumber.toString().padStart(4, '0')}`;

        next();
    } catch (error) {
        next(error);
    }
});

// Create the OtherConsumablesPurchase model
const OtherConsumablesPurchase = mongoose.model('OtherConsumablesPurchase', otherConsumablesPurchaseSchema);

export default OtherConsumablesPurchase;
