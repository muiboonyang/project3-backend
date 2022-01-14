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
// EXPORT
//======================

module.exports = router;
