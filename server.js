// =======================================
//              DEPENDENCIES
// =======================================

// Dependencies
const connectDB = require("./models/db");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");

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
app.use(methodOverride("_method")); // get, post - dont need method override / put, delete - need to use method override
app.use(express.static("public")); // allow loading of static files in "public" directory

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
