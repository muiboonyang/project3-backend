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

//======================
// CREATE - Post - Create session (new log in)
//=======================

router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const checkUserExist = await UserModel.find({ username: username }); // no matter the number of documents matched, a cursor {} is returned, never null

  if (checkUserExist.length === 0) {
    res.status(403).json(`The username "${username}" does not exist.`);
    return;
  } else {
    const loginDetails = await UserModel.findOne({ username: username }); //  if query matches, first document is returned, otherwise null.
    const hash = loginDetails.password;
    const valid = await bcrypt.compare(password, hash);

    if (valid) {
      req.session.currentUser = loginDetails.username;
      req.session.auth = true;
      // res.json(
      //   `Login sucessful! username: ${username} | password: ${password} | hash: ${hash}`
      // );
      res.json({ username });
      return;
    } else {
      req.session.auth = false;
      res
        .status(403)
        .json({ status: "forbidden", message: "Login unsuccessful" });
    }
  }
});

//======================
// DESTROY - Destroy session (log out)
//=======================

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json("Logged out successfully!");
});

//======================
// EXPORT
//======================

module.exports = router;
