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

// Get 'Log In' form
router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// Create session (new log in)
router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginDetails = await User.findOne({ username: req.body.username });
  console.log(loginDetails);
  console.log(loginDetails.username);
  console.log(loginDetails.password);

  const hash = loginDetails.password;
  const valid = await bcrypt.compare(password, hash);

  if (valid) {
    req.session.currentUser = loginDetails.username;
    req.session.auth = true;
    res.redirect("/room");
  } else {
    req.session.auth = false;
    res.status(403).json({ status: "forbidden", msg: "You are not logged in" });
  }
});

// Destroy session (log out)
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//======================
// EXPORT
//======================

module.exports = router;
