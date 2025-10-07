



     


import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../Middleware/auth.js";
import {sample }from '../Models/sample.js';
dotenv.config();

const userauth=Router();

const user = new Map();


userauth.get('/',(req,res)=>{
    console.log("HI");
    res.send("Hello Everyone");
});

userauth.post('/signup',async(req,res)=>{
    try{
        
    
    const {FirstName,LastName,UserName,Password,UserRole} = req.body;
    console.log(FirstName);
  
    const existingUser=await sample.findOne({userName:UserName})
    console.log(existingUser);
    
 
  if(existingUser){
       res.status(400).send("Username already exist") ;
    }
  else {
      console.log("hello")
        const newPassword =await bcrypt.hash(Password,10);
        console.log(newPassword);

        const newUser = new sample({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newPassword,
            userRole: UserRole
          });
           
          await newUser.save();
        res.status(201).send("Signed-up successfully")
    }}
    

catch{
    res.status(500).send("Internal Server error");
}


  
   
})







userauth.post('/login', async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const result = await sample.findOne({ userName: UserName });

    if (!result) return res.status(400).send("Enter a valid username");

    const valid = await bcrypt.compare(Password, result.password);
    if (!valid) return res.status(401).json({ msg: "Unauthorized access" });

    const token = jwt.sign(
      { _id: result._id, userName: result.userName, userRole: result.userRole },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }     



    );

  

    
    res.cookie("authToken", token, { httpOnly: true, sameSite: "lax" });

    res.status(200).json({
      message: "Logged in successfully",
      userRole: result.userRole,
      userName: result.userName
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});


export { userauth };