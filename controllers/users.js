//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const TaskModel = require("../models/tasks");

//======================
// ROUTES
//======================

// Get 'create new account' form
router.get("/new", (req, res) => {
  res.redirect("users/new.ejs");
});

// Post - Create new account using form input
router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 12);
  await User.create({ username: username, password: hashPassword });
  res.redirect("/");
});

//======================
// EXPORT
//======================

module.exports = router;
