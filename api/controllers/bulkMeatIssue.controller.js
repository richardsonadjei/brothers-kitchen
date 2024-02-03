import BulkMeatIssue from '../models/bulkIssue.model.js'; // Adjust the path based on your project structure

// Create a new bulk meat issue
export const createBulkMeatIssue = async (req, res) => {
  try {
    const { meats, recordedBy } = req.body;

    // Create a new BulkMeatIssue instance
    const newBulkMeatIssue = new BulkMeatIssue({
      meats,
      recordedBy,
    });

    // Save the instance to the database
    const savedBulkMeatIssue = await newBulkMeatIssue.save();

    res.status(201).json(savedBulkMeatIssue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bulk meat issues within a particular period
export const getBulkMeatIssuesInPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query for bulk meat issues within the specified period
    const bulkMeatIssuesInPeriod = await BulkMeatIssue.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(bulkMeatIssuesInPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Add more controller functions as needed
