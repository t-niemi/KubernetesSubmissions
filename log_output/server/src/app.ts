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
    if (!(await fileExists("files/out.txt"))) {
      res.send("");
      return;
    }
    const data = (await fs.promises.readFile("files/out.txt", "utf-8")).split(
      /\r?\n/
    );
    //res.send(data.map((item) => "<div>" + item).join("</div>"));
    res.send(data.join("<br/>"));
  } catch (err) {
    console.error(err);
  }
});

export default app;
