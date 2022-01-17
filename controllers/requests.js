//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const TaskModel = require("../models/tasks");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//======================
// ROUTES
//======================

//======================
// CREATE - Post (Create new 'requests' based on form input)
//======================

// router.post("/", upload.single("image"), async (req, res) => {
//   await TaskModel.create({ ...req.body, image: req.file.path }, (err) => {

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
