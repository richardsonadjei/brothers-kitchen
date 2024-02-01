import mongoose from 'mongoose';

const cookingIngredientsPurchaseSchema = new mongoose.Schema({
  ingredientPurchaseNumber: {
    type: String,
  },
  description: [
    {
      itemName: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  overalltotal: {
    type: Number,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  recordedBy: {
    type: String,
    required: true,
  },
});

cookingIngredientsPurchaseSchema.pre('save', async function (next) {
  // Generate ingredientPurchaseNumber
  const lastRecord = await this.constructor.findOne({}, {}, { sort: { ingredientPurchaseNumber: -1 } });
  const lastIngredientPurchaseNumber = lastRecord && lastRecord.ingredientPurchaseNumber
    ? parseInt(lastRecord.ingredientPurchaseNumber.replace('IP', ''))
    : 0;

  const nextIngredientPurchaseNumber = lastIngredientPurchaseNumber + 1;
  this.ingredientPurchaseNumber = `IP${nextIngredientPurchaseNumber.toString().padStart(4, '0')}`;

  // Calculate total amount for all description items
  const totalAmount = this.description.reduce((total, item) => total + item.amount, 0);
  this.overalltotal = totalAmount;

  next();
});

const CookingIngredientsPurchase = mongoose.model('CookingIngredientsPurchase', cookingIngredientsPurchaseSchema);

export default CookingIngredientsPurchase;
