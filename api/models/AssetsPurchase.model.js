// models/businessAssetsPurchase.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the BusinessAssetsPurchase schema
const businessAssetsPurchaseSchema = new Schema({
    businessAssetsPurchaseNumber: {
        type: String,
        unique: true,
    },
    category: {
        type: String,
        default: 'Business Assets Purchase',
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

// Generate businessAssetsPurchaseNumber before saving
businessAssetsPurchaseSchema.pre('save', async function (next) {
    try {
        const lastRecord = await this.constructor.findOne({}, {}, { sort: { businessAssetsPurchaseNumber: -1 } });
        const lastBusinessAssetsPurchaseNumber = lastRecord && lastRecord.businessAssetsPurchaseNumber
            ? parseInt(lastRecord.businessAssetsPurchaseNumber.replace('BA', ''))
            : 0;

        const nextBusinessAssetsPurchaseNumber = lastBusinessAssetsPurchaseNumber + 1;
        this.businessAssetsPurchaseNumber = `BA${nextBusinessAssetsPurchaseNumber.toString().padStart(4, '0')}`;

        next();
    } catch (error) {
        next(error);
    }
});

// Create the BusinessAssetsPurchase model
const BusinessAssetsPurchase = mongoose.model('BusinessAssetsPurchase', businessAssetsPurchaseSchema);

export default BusinessAssetsPurchase;
