
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  userRole: { type: String, default: "user" },
});

export default mongoose.model("User", userSchema);
