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
// READ - Get (for all + each category)
//======================

router.post("/", async (req, res) => {
  try {
    // await TaskModel.findByIdAndUpdate(req.body.id, {
    //   accepted: req.body.accepted,
    // });
    // res.json({ message: "Acceptance status updated!" });
  } catch (err) {
    console.error(err);
  }
});

//======================
// EXPORT
//======================

module.exports = router;