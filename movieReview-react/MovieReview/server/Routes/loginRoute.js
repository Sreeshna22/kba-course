




     






   




// import { Router } from "express";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import authenticate from "../Middleware/auth.js";

// import { sample } from '../Models/sample.js';

// dotenv.config();

// // const userauth=Router();

// // // const user = new Map();


// // userauth.get('/',(req,res)=>{
// //     console.log("HI");
// //     res.send("Hello Everyone");
// // });

// // userauth.post('/signup',async(req,res)=>{
// //     try{
        
    
// //     const {FirstName,LastName,UserName,Password,UserRole} = req.body;
// //     console.log(FirstName);
  
// //     const existingUser=await sample.findOne({userName:UserName})
// //     console.log(existingUser);
    
 
// //   if(existingUser){
// //        res.status(400).send("Username already exist") ;
// //     }
// //   else {
// //       console.log("hello")
// //         const newPassword =await bcrypt.hash(Password,10);
// //         console.log(newPassword);

// //         const newUser = new sample({
// //             firstName: FirstName,
// //             lastName: LastName,
// //             userName: UserName,
// //             password: newPassword,
// //             userRole: UserRole
// //           });
           
// //           await newUser.save();
// //         res.status(201).send("Signed-up successfully")
// //     }}
    

// // catch{
// //     res.status(500).send("Internal Server error");
// // }


  
   
// // })
































import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticate from "../Middleware/auth.js";
import { sample } from "../Models/sample.js";

dotenv.config();
const userauth = Router();


userauth.post("/signup", async (req, res) => {
  try {
    const { FirstName, LastName, UserName, Password, UserRole } = req.body;

    const existingUser = await sample.findOne({ userName: UserName });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new sample({
      firstName: FirstName,
      lastName: LastName,
      userName: UserName,
      password: hashedPassword,
      userRole: UserRole,
    });

    await newUser.save();
    res.status(201).json({ msg: "Signed-up successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


userauth.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const user = await sample.findOne({ userName: UserName });
    if (!user) return res.status(400).json({ msg: "Invalid username" });

    const valid = await bcrypt.compare(Password, user.password);
    if (!valid) return res.status(401).json({ msg: "Unauthorized access" });

    const token = jwt.sign(
      { id: user._id, userName: user.userName, userRole: user.userRole },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
   

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      msg: "Logged in successfully",
      userRole: user.userRole,
      userName: user.userName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


userauth.get("/profile", authenticate, (req, res) => {
  res.json({
    id: req.user._id,
    userName: req.user.userName,
    userRole: req.user.userRole,
  });
});


userauth.post("/logout", (req, res) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});



export { userauth };
