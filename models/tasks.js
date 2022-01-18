const mongoose = require("mongoose");

//=======================
// Schema - template for documents
//=======================

const TaskSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
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
    acceptedBy: { type: String },
    image: {
      type: String,
      default:
        "https://lp-cms-production.imgix.net/2019-06/3cb45f6e59190e8213ce0a35394d0e11-nice.jpg",
    },
    review: { type: String },
  },
  { timestamps: true, collection: "tasks" }
);

const TaskModel = mongoose.model("TaskModel", TaskSchema);

module.exports = TaskModel;
