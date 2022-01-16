// =======================================
//              DEPENDENCIES
// =======================================

// Dependencies
const connectDB = require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

// Config
const mongoURI = "mongodb://localhost:27017/tasks";
connectDB(mongoURI);

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json()); // allows res.body to work (express.json lets you read the req.body in json)
app.use(express.urlencoded({ extended: false })); // allows you to read what the forms send over (by default, it's all encoded), just declare it
app.use("/uploads", express.static("uploads"));

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

app.post("/requests", upload.single("image"), async (req, res) => {
  await TaskModel.create({ ...req.body, image: req.file.path }, (err, data) => {
    if (err) console.log(err.message);
    res.json(req.body);
  });
});

//======================
// UPDATE - Change tasks status 'accepted?' to true
//======================

// Change accepted to true
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

// Change completed to true
app.post("/complete", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.body.id, {
      completed: req.body.completed,
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

app.get("/search/:type/:id", async (req, res) => {
  const requestCard = await TaskModel.findOne({ _id: req.params.id });
  res.json(requestCard);
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
