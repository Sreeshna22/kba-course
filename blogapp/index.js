import express from "express";
import mongoose from "mongoose";
import blogRoute from "./Routes/BlogRoute.js";

const app = express();
app.use(express.json()); 


mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" DB Error:", err));


app.use("/api/blogs", blogRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
