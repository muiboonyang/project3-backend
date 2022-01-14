// =======================================
//              DEPENDENCIES
// =======================================

// Dependencies
const connectDB = require("./models/db");
const express = require("express");
const cors = require("cors");

// Config
const mongoURI = "mongodb://localhost:27017/tasks";
connectDB(mongoURI);

const app = express();
const methodOverride = require("method-override");

app.use(cors());
app.use(express.json()); // allows res.body to work (express.json lets you read the req.body in json)
app.use(express.urlencoded({ extended: false })); // allows you to read what the forms send over (by default, it's all encoded), just declare it
app.use(methodOverride("_method"));
// -- to delete if unnecessary --
// put, delete - need to use method override
// get, post - dont need method override

// =======================================
//              DATABASE
// =======================================

// Models
const TaskModel = require("./models/tasks.js");
const taskSeed = require("./models/seed.js");
// -- to rename model file name --
// =======================================
//              ROUTES
// =======================================

//======================
// Seed data
//======================

app.post("/seed", async (req, res) => {
  await TaskModel.create(taskSeed, (err, data) => {
    if (err) console.log(err.message);
    res.redirect("http://localhost:3000/search/all");
  });
});

//======================
// CREATE - Post (New Requests)
//======================

app.post("/requests", async (req, res) => {
  await TaskModel.create(req.body, (err, data) => {
    if (err) console.log(err.message);
    res.redirect("http://localhost:3000/search/all");
  });
});

//======================
// UPDATE - Change tasks status 'accepted?' to true
//======================

app.post("/tasks", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.body.id, {
      accepted: req.body.accepted,
    });
    res.json({ message: "Updated!" });
  } catch (err) {
    console.error(err);
  }
});

// app.post("/product/:id", async (req, res) => {
//   await Product.updateOne(
//     { _id: req.params.id },
//     {
//       name: req.body.name,
//       description: req.body.description,
//       img: req.body.img,
//       price: req.body.price,
//       qty: req.body.qty,
//     }
//   );
//   res.redirect("/product/" + req.params.id);
// });

//======================
// READ - Get (for all + each category)
//======================

app.get("/search/:type", async (req, res) => {
  if (req.params.type === "all") {
    const allRequests = await TaskModel.find();
    res.json(allRequests);
    return;
  }
  const requestType = await TaskModel.find({ type: req.params.type });
  res.json(requestType);
});

//======================
// DELETE - Delete
//======================

app.post("/delete/:id", async (req, res) => {
  if (req.params.id === "all") {
    await TaskModel.deleteMany();
    res.redirect("http://localhost:3000/search/all");
    return;
  }
  await TaskModel.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

// =======================================
//              LISTENER
// =======================================

app.listen(5001);
