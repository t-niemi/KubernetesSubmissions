import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

const stamp = uuidv4();
let msg = new Date().toISOString().concat(" ", stamp.toString());

setInterval(function () {
  msg = new Date().toISOString().concat(" ", stamp.toString());
  console.log(msg);
}, 5000);

app.get("/", (_req, res) => {
  res.send({ status: msg });
});

export default app;
