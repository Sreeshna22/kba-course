import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const router = Router();
dotenv.config();
const user = new Map();

router.get('/hi', (req,res)=> {
    console.log('hi world ');
    res.send('hai world')
})

router.post('/signup', async(req, res) => {
    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        console.log(FirstName);
        try {
            
            const newpassword = await bcrypt.hash(Password, 10)
            console.log(newpassword)
            if (user.get(UserName)) {
                res.send("username already exist")
            } else {
                user.set(UserName, { FirstName, LastName, newpassword, UserRole });
            }

            res.status(201).json({ msg: "Successfully created" })
        } catch {
            res.status(404).json({msg:"something went wrong on bcrypt"})
        }
        
    } catch {
        res.status(500).send(error)
    }
})
router.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        console.log(UserName);
        console.log(Password);
        const result = user.get(UserName);
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Username not registered" })
        }
        const valid = await bcrypt.compare(Password, result.newpassword)
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
})

 export {router}