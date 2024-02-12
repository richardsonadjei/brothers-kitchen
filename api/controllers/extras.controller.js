import MeatType from "../models/meatType.model.js";


export const recordMeatType = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the meat type already exists
    const existingMeatType = await MeatType.findOne({ name });
    if (existingMeatType) {
      return res.status(400).json({ error: 'Meat type already exists' });
    }

    // Create a new meat type instance
    const newMeatType = new MeatType({ name });
    
    // Save the new meat type
    await newMeatType.save();
    
    res.status(201).json(newMeatType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// View all meat types
export const viewAllMeatTypes = async (req, res) => {
  try {
    const meatTypes = await MeatType.find();
    res.json(meatTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a meat type
export const editMeatType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedMeatType = await MeatType.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedMeatType) {
      return res.status(404).json({ error: 'Meat type not found' });
    }
    res.json(updatedMeatType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a meat type
export const deleteMeatType = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeatType = await MeatType.findByIdAndDelete(id);
    if (!deletedMeatType) {
      return res.status(404).json({ error: 'Meat type not found' });
    }
    res.json({ message: 'Meat type deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
