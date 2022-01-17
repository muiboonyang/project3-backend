// =======================================
//              DEPENDENCIES
// =======================================

// Dependencies
const connectDB = require("./models/db");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Config
const mongoURI = "mongodb://localhost:27017/project3";
connectDB(mongoURI);

const app = express();

// =======================================
//                MIDDLEWARE
// =======================================

// body parser middleware
app.use(cors()); // overcomes cors issue
app.use(express.json()); // allows res.body to work (express.json lets you read the req.body in json)
app.use(express.urlencoded({ extended: false })); // allows you to read what the forms send over (by default, it's all encoded), just declare it
app.use(express.static("public")); // allow loading of static files in "public" directory
app.use("/uploads", express.static("uploads"));

// session middleware
app.use(
  session({
    secret: "project3",
    resave: false,
    saveUninitialized: false,
  })
);

// =======================================
//                CONTROLLERS
// =======================================

const userController = require("./controllers/users.js");
app.use("/users", userController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

const taskController = require("./controllers/tasks.js");
app.use("/tasks", taskController);

const requestController = require("./controllers/requests.js");
app.use("/requests", requestController);

const searchController = require("./controllers/search.js");
app.use("/search", searchController);

// =======================================
//              DATABASE (MODELS)
// =======================================

const TaskModel = require("./models/tasks.js");
const UserModel = require("./models/users.js");

const taskSeed = require("./models/seed-tasks.js");
const userSeed = require("./models/seed-users.js");

// =======================================
//              ROUTES
// =======================================

//======================
// CREATE - Seed data
//======================

app.post("/seedtask", async (req, res) => {
  await TaskModel.create(taskSeed, (err, data) => {
    if (err) console.log(err.message);
    res.redirect("http://localhost:3000/search/all");
  });
});

app.post("/seeduser", async (req, res) => {
  // encrypts the given seed passwords
  await userSeed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  UserModel.create(userSeed, (err, createdUsers) => {
    console.log(createdUsers);
    res.redirect("http://localhost:3000/");
  });
});

//======================
// CREATE - Import form data
//======================

app.post("/requests", upload.single("image"), async (req, res) => {
  if (req.file) {
    await TaskModel.findOneAndUpdate({ image: "" }, { image: req.file.path });
  } else {
    await TaskModel.create(req.body, (err) => {
      if (err) {
        res.status(403).json(`Form failed to submit.`);
        return;
      } else {
        res.json(`Form submitted successfully!`);
      }
    });
  }
});

//======================
// DELETE - Delete
//======================

app.post("/delete/:id", async (req, res) => {
  if (req.params.id === "alltask") {
    await TaskModel.deleteMany();
    res.redirect("http://localhost:3000/search/all");
    return;
  } else if (req.params.id === "alluser") {
    await UserModel.deleteMany();
    res.redirect("http://localhost:3000/");
    return;
  }
  await TaskModel.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

// =======================================
//              LISTENER
// =======================================

app.listen(5001);
