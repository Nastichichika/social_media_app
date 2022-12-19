import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2, 
      max: 30,
    }, 
    lastName: {
      type: String,
      require: true,
      min: 2, 
      max: 30,
    },
    email:  {
      type: String,
      require: true,
      unique,
      max: 30,
    },
    password:  {
      type: String,
      require: true,
      min: 5,
    },
    friends: {
      type: Array,
      default: [],
    },
    picturePath:  {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
  },
  { timestamps: true },
)

export default new mongoose.model("User", UserSchema);