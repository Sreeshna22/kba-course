


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();




const authenticate = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return res.status(401).send("Unauthorized access");

  const token = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("authToken="))
    ?.split("=")[1];

  if (!token) return res.status(401).send("Unauthorized access");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      id: verified._id,
      userName: verified.userName,
      role: verified.userRole 
    };
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized access");
  }
};

export default authenticate;
