require("dotenv").config();
import express, { json } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { AppRouter } from './router';
import './controllers/AuthController';

const controllerRouter = AppRouter.getInstance();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();
const port = process.env.PORT;

const corsWhitelist = ["https://siemanko", "https://api.siemanko"];

var corsOptions: CorsOptions = {
  origin: 'https://siemanko',
  credentials: true,
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(controllerRouter);

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
  console.log(`Example app listening at https://siemanko:${port}`);
});
