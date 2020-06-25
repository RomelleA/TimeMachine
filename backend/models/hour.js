const mongoose = require('mongoose');

const hourSchema = mongoose.Schema({          // Setting schema for
  date: { type: Date, required: true },       // each 'Hour' object
  startTime: { type: Date, required: true },  // in the DB
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Hour', hourSchema);

