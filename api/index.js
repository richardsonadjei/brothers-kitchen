import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import meatSalesRouter from './routes/meatSales.routes.js';
import expenseRouter from './routes/expense.routes.js';
import router from './routes/meatIssue.routes.js';
import extrasRouter from './routes/extras.routes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


  const __dirname = path.resolve();
const app = express();
app.use(cookieParser());

app.use(express.json());

app.use('/api/', userRouter);
app.use('/api/', meatSalesRouter);
app.use('/api/', expenseRouter);
app.use('/api/', router);
app.use('/api/', extrasRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

