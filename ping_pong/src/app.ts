import express from "express";
import fs from "node:fs";

const app = express();
app.use(express.json());

let counter = 0;

const writePongs = () => {
  try {
    fs.mkdirSync("files", { recursive: true });
    fs.writeFileSync("/app/files/out.txt", counter.toString());
  } catch (err) {
    console.error(err);
  }
};

writePongs();

app.get("/", (_req, res) => {
  res.send("pong " + counter++);
  writePongs();
});

export default app;
