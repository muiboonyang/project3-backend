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
  res.redirect("http://localhost:3000/login");
});

// Get current user name
// router.get("/", (req, res) => {
//   const username = req.body.username;
//   res.json({ username });
// });

// Create session (new log in)
router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const checkUserExist = await UserModel.find({ username: username }); // no matter the number of documents matched, a cursor {} is returned, never null
  //   console.log(checkUserExist);

  if (checkUserExist.length === 0) {
    res.status(403).json(`The username "${username}" does not exist.`);
    return;
  } else {
    const loginDetails = await UserModel.findOne({ username: username }); //  if query matches, first document is returned, otherwise null.
    // console.log(loginDetails);
    const hash = loginDetails.password;
    const valid = await bcrypt.compare(password, hash);

    if (valid) {
      req.session.currentUser = loginDetails.username;
      req.session.auth = true;
      res.json(
        `Login sucecssful! username: ${username} | password: ${password} | hash: ${hash}`
      );
      return;
    } else {
      req.session.auth = false;
      res
        .status(403)
        .json({ status: "forbidden", message: "Login unsuccessful" });
    }
  }
});

// Destroy session (log out)
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out successfully!");
});

//======================
// EXPORT
//======================

module.exports = router;
