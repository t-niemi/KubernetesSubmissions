import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/", (_req, res) => {
  res.send("<p>Hello!</p>");
});

export default app;
