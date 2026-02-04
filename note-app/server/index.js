import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import notesRoute from './routes/notesRoute.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/notes', notesRoute);

app.get('/', (req, res) => {
  res.send('Hello Everyone, Notes API is running!');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start server
// Start server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
