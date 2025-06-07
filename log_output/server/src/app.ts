import express from "express";
import fs from "node:fs";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

const fileExists = async (path: fs.PathLike) => {
  try {
    const stat = await fs.promises.stat(path);
    return stat.isFile();
  } catch {
    return false;
  }
};

app.get("/", async (_req, res) => {
  try {
    if (
      !(await fileExists("files/out.txt")) ||
      !(await fileExists("pingpong/out.txt"))
    ) {
      res.send("");
      return;
    }
    const status = (await fs.promises.readFile("files/out.txt", "utf-8")).split(
      /\r?\n/
    );
    if (status.length < 2) {
      res.send("");
      return;
    }
    const pings = await fs.promises.readFile("pingpong/out.txt", "utf-8");
    res.send(status[status.length - 2] + "<br/>" + "Ping / Pongs: " + pings);
  } catch (err) {
    console.error(err);
  }
});

export default app;
