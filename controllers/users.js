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
  const hashPassword = await bcrypt.hash(password, 12);
  await UserModel.create({ username: username, password: hashPassword });
  console.log(
    `New user created! username: ${username} | password: ${password} | hash: ${hashPassword}`
  );
  res.redirect("http://localhost:3000/login");
});

//======================
// EXPORT
//======================

module.exports = router;
