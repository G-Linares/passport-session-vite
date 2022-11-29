import mongoose from "mongoose";
const user = new mongoose.Schema({
  username: String,
  password: String
});

export const User = mongoose.model("User", user);
