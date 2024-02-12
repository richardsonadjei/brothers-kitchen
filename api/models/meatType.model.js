import mongoose from 'mongoose';

const { Schema } = mongoose;

const meatTypeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },

  },
  {
    timestamps: true, 
  }
);

const MeatType = mongoose.model('MeatType', meatTypeSchema);

export default MeatType;
