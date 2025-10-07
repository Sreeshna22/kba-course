
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import { userauth } from "./Routes/loginRoute.js";
import { user } from "./Routes/userRoute.js";
import { admin } from "./Routes/adminRoute.js";
import authenticate from "./Middleware/auth.js";
import admincheck from "./Middleware/admin.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(json());

app.use("/auth", userauth); 


app.use("/user", user);


app.use("/admin", authenticate, admincheck, admin);


app.get("/", (req, res) => {
  res.send("Hello Everyone");
});

mongoose
  .connect("mongodb://localhost:27017/Movie-Review-react")
  .then(() => console.log("MongoDB successfully connected"))
  .catch((error) => console.log("Connection error:", error));

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 8000}`);
});
