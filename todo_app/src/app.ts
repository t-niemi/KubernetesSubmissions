import express from "express";
import path from "path";
import fs from "node:fs";
import download from "./download";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const updateImg = async (path: string) => {
  try {
    const stat = await fs.promises.stat(path);
    // File is older than 10 min
    if (Date.now() - stat.mtimeMs > 1000 * 60 * 10) {
      throw new Error();
    }
    return;
  } catch {
    try {
      if (!process.env.PIC_URL) {
        throw new Error("PIC_URL env-variable missing!");
      }
      await download(process.env.PIC_URL, path);
    } catch (err) {
      console.log(err);
    }
    return;
  }
};

app.get("/api/img", async (_req, res) => {
  //const imgPath = path.join(__dirname, "../files/logo.jpg");
  const imgPath = path.join(process.cwd(), "files/logo.jpg");
  await updateImg(imgPath);

  res.sendFile(imgPath, (err) => {
    if (err) {
      console.log("Error sending file:", err);
      res.status(500).send("Unable to send image!");
    }
  });
});

export default app;
