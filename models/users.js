const mongoose = require("mongoose");

//=======================
// Schema - template for documents
//=======================

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    unit: { type: String, required: true },
    zipcode: { type: String, required: true },
    reviews: [{}],
  },
  { timestamps: true },
  { collection: "users" }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
