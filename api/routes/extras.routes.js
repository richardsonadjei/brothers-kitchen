import express from 'express';
import {
  viewAllMeatTypes,
  editMeatType,
  deleteMeatType,
  recordMeatType,
} from '../controllers/extras.controller.js';

const extrasRouter = express.Router();

// Route to view all meat types
extrasRouter.get('/all-meat-types', viewAllMeatTypes);

// Route to edit a meat type
extrasRouter.put('/edit-meat-type/:id', editMeatType);

// Route to delete a meat type
extrasRouter.delete('/delete-meat-type:id', deleteMeatType);
extrasRouter.post('/add-meat-type', recordMeatType);

export default extrasRouter;
