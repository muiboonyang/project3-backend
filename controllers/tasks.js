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
// UPDATE - Change tasks status 'accepted?' to true
//======================

router.post("/", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.body.id, {
      accepted: req.body.accepted,
      acceptedBy: req.body.acceptedBy,
    });
    res.json({ message: "Acceptance status updated!" });
  } catch (err) {
    console.error(err);
  }
});

//======================
// UPDATE - Change completed to true
//======================

router.post("/complete", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.body.id, {
      completed: req.body.completed,
    });
    res.json({ message: "Updated!" });
  } catch (err) {
    console.error(err);
  }
});

//======================
// EXPORT
//======================

module.exports = router;
