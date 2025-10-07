
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticate = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return res.status(401).json({ msg: "Unauthorized access" });

  const cookie = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("authToken="));
  if (!cookie) return res.status(401).json({ msg: "Unauthorized access" });

  const token = cookie.split("=")[1];

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      _id: verified.id,
      userName: verified.userName,
      userRole: verified.userRole,
    };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authenticate;
