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
  await TaskModel.create(req.body, (err) => {
    if (err) {
      res.status(403).json(`Form failed to submit.`);
      return;
    } else {
      res.json(`Form submitted successfully!`);
    }
  });
});

//======================
// EXPORT
//======================

module.exports = router;
