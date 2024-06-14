import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Admin status is required"],
  },
});

export default mongoose.model("User", userSchema);
