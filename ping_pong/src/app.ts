import express from "express";

const app = express();
app.use(express.json());

let counter = 0;

app.get("/", (_req, res) => {
  res.send("pong " + counter++);
});

export default app;
