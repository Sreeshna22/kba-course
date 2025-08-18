import  express ,{json} from 'express';
import dotenv from "dotenv";
import  {router} from './Routes/loginRoute.js';
import {admin} from  './Routes/adminRoute.js';
import { authenticate } from "./Middleware/auth.js";

import admincheck from './Middleware/admin.js';

import mongoose from 'mongoose';


dotenv.config();


const app = express();
 app.use(json())

app.use('/',router)

app.use('/', authenticate,admincheck, admin); 

app.use('/admin', admin);




app.get('/',(req,res)=>{
    console.log("hello world");
    res.send("hello world"); 

})




mongoose.connect("mongodb://localhost:27017/Movie-Review").then(() => {
        console.log("MongoDB successfully connected");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

app.listen(process.env.PORT,()=>{
    console.log(`server is listening to the port ${process.env.PORT}`)
})   