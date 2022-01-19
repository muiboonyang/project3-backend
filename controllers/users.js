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
// READ - Get (all users)
//=======================

router.get("/", async (req, res) => {
  const allUsers = await UserModel.find({});
  res.json(allUsers);
});

//======================
// READ - Get (user profile of current user)
//=======================

router.get("/:username", async (req, res) => {
  const foundUser = await UserModel.findOne({ username: req.params.username });
  res.json(foundUser);
});

//======================
// CREATE - Post (new account using form input)
//=======================

router.post("/new", async (req, res) => {
  const formInput = req.body;
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
    await UserModel.create({ ...formInput, password: hashPassword });
    res.json(
      `New user created! username: ${username} | password: ${password} | hash: ${hashPassword}`
    );
  }
});

//======================
// UPDATE
//======================

router.post("/:username/update", async (req, res) => {
  const formInput = req.body;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 12);

  await UserModel.findOneAndUpdate(
    { username: req.params.username },
    { ...formInput, password: hashPassword }
  );
  res.json(`Profile updated successfully!`);
});

//======================
// EXPORT
//======================

module.exports = router;
