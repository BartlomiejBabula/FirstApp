require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://db:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTED!");
  })
  .catch((err) => console.log("COULDN'T CONNECT TO MONGO!", err));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ a: 1 }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
