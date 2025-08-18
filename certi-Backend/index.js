import  express ,{json} from 'express';
import  dotenv from 'dotenv';
import  {router} from './Routes/loginRoute.js';
import {admin} from  './Routes/adminRoute.js';
import { authenticate } from "./Middleware/auth.js";

import admincheck from './Middleware/admin.js';

import { user } from './Routes/userRoute.js';    

                   



dotenv.config()     


const app = express();
 app.use(json())
app.use('/user', user);                 
app.use('/',router)
app.use('/', authenticate, admincheck, admin); 
app.use('/',user)
app.use('/admin', admin);





app.listen(process.env.PORT,()=>{
    console.log(`server is listening to the port ${process.env.PORT}`)
})   