

import express, { json } from 'express';  
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
 import { user } from './Routes/userRoute.js';

import authenticate from './Middleware/auth.js';
import adminCheck from "./Middleware/admin.js";




import { userauth } from './Routes/loginRoute.js';      
  

import{admin } from './Routes/adminRoute.js';


dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(json());


app.use('/', userauth);
app.use('/', admin);


app.use("/admin", authenticate, adminCheck, admin);



app.use('/user', authenticate, user); 

app.get('/', function (req, res) {
  res.send('Hello Everyone');


});   
app.get('/profile', authenticate, (req, res) => {
  res.json({ userName: req.user, userRole: req.role });
});





app.post('/', function (req, res) {
  res.send('Hello Everyone');
});

mongoose
  .connect('mongodb://localhost:27017/MovieReview')
  .then(() => {
    console.log('MongoDB successfully connected');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });                                           

app.listen(process.env.PORT, () => {
  console.log(`server is listening to the port ${process.env.PORT}`);
});
