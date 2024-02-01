// models/platesAndBowlsPurchase.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the PlatesAndBowlsPurchase schema
const platesAndBowlsPurchaseSchema = new Schema({
    platesAndBowlsPurchaseNumber: {
        type: String,
        unique: true,
    },
    category: {
        type: String,
        default: 'Plates and Bowls Purchase',
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String, // Add the description field
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

// Generate platesAndBowlsPurchaseNumber before saving
platesAndBowlsPurchaseSchema.pre('save', async function (next) {
    try {
        const lastRecord = await this.constructor.findOne({}, {}, { sort: { platesAndBowlsPurchaseNumber: -1 } });
        const lastPlatesAndBowlsPurchaseNumber = lastRecord && lastRecord.platesAndBowlsPurchaseNumber
            ? parseInt(lastRecord.platesAndBowlsPurchaseNumber.replace('PB', ''))
            : 0;

        const nextPlatesAndBowlsPurchaseNumber = lastPlatesAndBowlsPurchaseNumber + 1;
        this.platesAndBowlsPurchaseNumber = `PB${nextPlatesAndBowlsPurchaseNumber.toString().padStart(4, '0')}`;

        next();
    } catch (error) {
        next(error);
    }
});

// Create the PlatesAndBowlsPurchase model
const PlatesAndBowlsPurchase = mongoose.model('PlatesAndBowlsPurchase', platesAndBowlsPurchaseSchema);

export default PlatesAndBowlsPurchase;
