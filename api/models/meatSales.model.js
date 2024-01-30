import mongoose from 'mongoose';

const { Schema } = mongoose;

const meatTypeValues = ['Intestines', 'Legs', 'Liver', 'Head'];
const paymentMethodValues = ['cash', 'momo'];

const meatSaleSchema = new Schema(
  {
    meatSalesNumber: {
      type: String,
      unique: true,
    },
    meats: [
      {
        type: {
          type: String,
          required: true,
          enum: meatTypeValues,
        },
        quantity: {
          type: Number,
          required: true,
        },
        pricePerUnit: {
          type: Number,
        },
        subTotal: {
          type: Number,
          // Calculated automatically in the pre-save hook
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      default: 'cash',
      enum: paymentMethodValues,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Add more fields as needed
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

meatSaleSchema.pre('save', async function (next) {
  try {
    // Calculate subTotal for each meat item
    this.meats.forEach((meatItem) => {
      // Set default prices based on meat type
      switch (meatItem.type) {
        case 'Intestines':
          meatItem.pricePerUnit = 10;
          break;
        case 'Legs':
          meatItem.pricePerUnit = 5;
          break;
        case 'Liver':
          meatItem.pricePerUnit = 10;
          break;
        case 'Head':
          meatItem.pricePerUnit = 10;
          break;
        // Add more cases for other meat types if needed
        default:
          // Handle default case or raise an error
          break;
      }

      meatItem.subTotal = meatItem.quantity * meatItem.pricePerUnit;
    });

    // Calculate totalAmount as the sum of all subTotals
    this.totalAmount = this.meats.reduce((total, meatItem) => total + meatItem.subTotal, 0);

    // Generate meatSalesNumber as before
    const lastRecord = await this.constructor.findOne({}, {}, { sort: { meatSalesNumber: -1 } });
    const lastMeatSalesNumber = lastRecord && lastRecord.meatSalesNumber
      ? parseInt(lastRecord.meatSalesNumber.replace('MS', ''))
      : 0;

    const nextMeatSalesNumber = lastMeatSalesNumber + 1;
    this.meatSalesNumber = `MS${nextMeatSalesNumber.toString().padStart(4, '0')}`;

    next();
  } catch (error) {
    next(error);
  }
});

const MeatSale = mongoose.model('MeatSale', meatSaleSchema);

export default MeatSale;
