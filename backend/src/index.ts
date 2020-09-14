require("dotenv").config();
import cors, { CorsOptions } from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import router from './urls';

const app = express();
const port = process.env.PORT;

const corsWhitelist = ["http://localhost", "http://api.localhost"];

var corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(router);

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
  res.end(JSON.stringify({ a: 2 }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
