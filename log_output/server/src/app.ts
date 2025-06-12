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
    const outPath = "files/out.txt";
    const configPath = "/config/information.txt";
    if (
      !(await fileExists(outPath)) //||
      //!(await fileExists("pingpong/out.txt"))
    ) {
      res.send("Did not find out-file!");
      return;
    }
    const status = (await fs.promises.readFile(outPath, "utf-8")).split(
      /\r?\n/
    );
    //const pings = await fs.promises.readFile("pingpong/out.txt", "utf-8");

    if (status.length < 2) {
      res.send("Status not available!");
      return;
    }

    if (
      !(await fileExists(configPath)) //||
    ) {
      res.send("Config missing!");
      return;
    }
    const configMessage = await fs.promises.readFile(configPath, "utf-8");

    const response = await fetch("http://ping-pong-svc:2345/pings");
    const pings = await response.text();
    res.send(
      "file content: " +
        configMessage +
        "<br/>" +
        "env variable: MESSAGE=" +
        process.env.MESSAGE +
        "<br/>" +
        status[status.length - 2] +
        "<br/>" +
        "Ping / Pongs: " +
        pings
    );
  } catch (err) {
    console.error(err);
  }
});

export default app;
