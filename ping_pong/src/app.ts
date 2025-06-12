import express from "express";
//import fs from "node:fs";
import db from "./connect";

const app = express();
app.use(express.json());

//let counter = 0;

interface Pongs {
  amount: number;
}

/*const writePongs = () => {
  try {
    fs.mkdirSync("files", { recursive: true });
    fs.writeFileSync("/app/files/out.txt", counter.toString());
  } catch (err) {
    console.error(err);
  }
};*/

//writePongs();

app.get("/", async (_req, res) => {
  const pongs = await db.query<Pongs>(
    "UPDATE pongs SET amount=amount+1 RETURNING amount-1 AS amount;",
    []
  );
  res.send("pong " + pongs.rows[0].amount);
  //writePongs();
});

app.get("/pings", async (_req, res) => {
  const pongs = await db.query<Pongs>("SELECT amount FROM pongs;", []);
  res.send(pongs.rows[0].amount);
});

export default app;
