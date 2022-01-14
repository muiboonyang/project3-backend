const mongoose = require("mongoose");

//=======================
// Schema - template for documents
//=======================

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: { type: [String] },
  },
  { timestamps: true },
  { collection: "users" }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
