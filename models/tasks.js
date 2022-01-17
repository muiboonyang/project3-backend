const mongoose = require("mongoose");

//=======================
// Schema - template for documents
//=======================

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    unit: { type: String, required: true },
    zipcode: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    comments: { type: String },
    accepted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true, collection: "tasks" }
);

const TaskModel = mongoose.model("TaskModel", TaskSchema);

module.exports = TaskModel;
