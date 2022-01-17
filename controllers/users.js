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

// Get 'create new account' form
router.get("/new", (req, res) => {
  res.redirect("http://localhost:3000/register");
});

// Post - Create new account using form input
router.post("/new", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUsername = await UserModel.find({ username: username });
  //   console.log(existingUsername);

  if (existingUsername.length !== 0) {
    res
      .status(403)
      .json(
        `Username "${req.body.username}" already exists! Choose another username.`
      );
    return;
  } else {
    const hashPassword = await bcrypt.hash(password, 12);
    await UserModel.create({ username: username, password: hashPassword });
    res.json(
      `New user created! username: ${username} | password: ${password} | hash: ${hashPassword}`
    );
  }
});

//======================
// EXPORT
//======================

module.exports = router;
