import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: false },
  street: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  zip: { type: Number, required: false },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
