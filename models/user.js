import { Schema, model } from "mongoose";
import Joi from"joi";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

//import{ handleMongooseError } from"../helpers";

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    username: {
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveError);
//cocst registerSchema = 
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

 

// export const schemas = {
//     registerSchema,
//     loginSchema,
// }

 const User = model("user", userSchema);
export default User;


// module.exports = {
//     User,
//     schemas,
// }