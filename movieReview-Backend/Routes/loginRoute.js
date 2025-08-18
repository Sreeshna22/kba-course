


import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Sample } from "../Models/sample.js"; 
import { authenticate } from "../Middleware/auth.js";


const router = Router();
dotenv.config();


router.get('/hi', (req,res)=> {
    console.log('hi world ');
    res.send('hai world')
})

router.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;

        const User = await Sample.findOne({ UserName });
        if (User) {
            return res.status(400).json({ msg: "Username already exists" });
        }

   
        const hashedPassword = await bcrypt.hash(Password, 10);

     
        const newUser = new Sample({
            FirstName:FirstName,
            LastName: LastName,
            UserName: UserName,
            Password: hashedPassword,
            UserRole : UserRole
        });

        await newUser.save();

        res.status(201).json({ msg: "Successfully created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        console.log(UserName);
        console.log(Password);    
        const result = await Sample.findOne({UserName});
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Username not registered" })
        }
        const valid = await bcrypt.compare(Password, result.Password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName: UserName, UserRole: result.UserRole }, process.env.secret_key, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authtoken', token,
                    { httpOnly: true }
                )
                res.status(200).json({ msg: "Successfully loggedin" })
            } else {
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }

    } catch {
        res.status(500).json({ msg: "Internal server error" })
    }
});


export { router };

