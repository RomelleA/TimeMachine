const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const hoursRoutes = require('./routes/hours');
const app = express();

mongoose // Connecting to DB
  .connect(
    "mongodb+srv://romelle:8rAgRBp3t4hqYZvW@clustertimeclock-obwgb.mongodb.net/node-angular?retryWrites=true&w=majority"
    , {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connecion failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Allowing CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/hours",hoursRoutes);
module.exports = app;
