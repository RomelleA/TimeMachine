const express = require('express');

const Hour = require("../models/hour");

const router = express.Router();

// Posting new Hour object to DB through - api/hours
router.post("", (req, res, next) => {
  const hour = new Hour({
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  hour.save().then(timeCreated => {  // Saving Hour object on DB
    res.status(201).json({
      message: "Hour added successffuly",
      hourID: timeCreated._id
  });
  });
});

router.patch("/:id", (req, res, next) => {
  const hour = new Hour({
    _id: req.body.id,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  Hour.updateOne({_id: req.params.id}, hour).then(result => {
   res.status(200).json({message: 'Update successful!'});
  })
});

// Getting Hour[] from DB through - api/hours
router.get("", (req, res, next) => {
  Hour.find().then((documents) => {
    res.status(200).json({
      message: "Hours fetched successfully",
      hours: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Hour.findById(req.params.id).then(hour => {
    if (hour) {
      res.status(200).json(hour);
    }
    else {
      res.status(404).json({ message:'Time not found!' });
    }
  })
});

// Deleting an Hour object from DB
router.delete("/:id", (req, res, next) => {
  Hour.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Hour Deleted" });
  })
});

module.exports = router;
