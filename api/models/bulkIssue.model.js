import mongoose from 'mongoose';

const { Schema } = mongoose;

const meatTypeValues = ['Intestines', 'Legs', 'Liver', 'Head'];

// Define the BulkMeatIssue schema
const bulkMeatIssueSchema = new Schema(
  {
    meatIssueNumber: {
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

bulkMeatIssueSchema.pre('save', async function (next) {
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

    // Generate meatIssueNumber as before
    const lastRecord = await this.constructor.findOne({}, {}, { sort: { meatIssueNumber: -1 } });
    const lastMeatIssueNumber = lastRecord && lastRecord.meatIssueNumber
      ? parseInt(lastRecord.meatIssueNumber.replace('MIN', ''))
      : 0;

    const nextMeatIssueNumber = lastMeatIssueNumber + 1;
    this.meatIssueNumber = `MIN${nextMeatIssueNumber.toString().padStart(4, '0')}`;

    next();
  } catch (error) {
    next(error);
  }
});

// Create the BulkMeatIssue model
const BulkMeatIssue = mongoose.model('BulkMeatIssue', bulkMeatIssueSchema);

export default BulkMeatIssue;
