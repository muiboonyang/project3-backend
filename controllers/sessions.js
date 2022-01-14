//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/users.js");

//======================
// ROUTES
//======================

// Get 'Log In' form
router.get("/new", (req, res) => {
  res.render("http://localhost:3000/login");
});

// Create session (new log in)
router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginDetails = await UserModel.findOne({ username: req.body.username });
  const hash = loginDetails.password;
  const valid = await bcrypt.compare(password, hash);

  if (valid) {
    req.session.currentUser = loginDetails.username;
    req.session.auth = true;
    console.log(
      `Login sucecssful! username: ${username} | password: ${password} | hash: ${hash}`
    );
    // res.send({ username: username });
    res.redirect("http://localhost:3000/");
  } else {
    req.session.auth = false;
    res.status(403).json({ status: "forbidden", msg: "Login unsuccessful" });
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
