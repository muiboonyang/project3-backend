//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const TaskModel = require("../models/tasks");

//======================
// ROUTES
//======================

//======================
// CREATE - Post (Create new 'requests' based on form input)
//======================

router.post("/", async (req, res) => {
  await TaskModel.create(req.body, (err, data) => {
    if (err) console.log(err.message);
    res.render("http://localhost:3000/search/all");
  });
});

//======================
// EXPORT
//======================

module.exports = router;
