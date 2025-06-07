import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";

const stamp = uuidv4();
let msg: string;

setInterval(function () {
  try {
    msg = new Date().toISOString().concat(": ", stamp.toString());
    fs.mkdirSync("files", { recursive: true });
    fs.writeFileSync("/app/files/out.txt", msg + "\n", { flag: "a+" });
  } catch (err) {
    console.error(err);
  }
}, 5000);
