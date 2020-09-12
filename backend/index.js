require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");

const corsWhitelist = ["http://localhost", "http://api.localhost"];
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

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
