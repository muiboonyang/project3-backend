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

router.get("/:type", async (req, res) => {
  if (req.params.type === "all") {
    const allRequests = await TaskModel.find();
    res.json(allRequests);
    return;
  }
  const requestType = await TaskModel.find({ type: req.params.type });
  res.json(requestType);
});

//======================
// READ - Get task by category + specific task
//======================

router.get("/:type/:id", async (req, res) => {
  const requestCard = await TaskModel.findOne({ _id: req.params.id });
  res.json(requestCard);
});

//======================
// EXPORT
//======================

module.exports = router;
