import { v4 as uuidv4 } from "uuid";

const stamp = uuidv4();

var myInt = setInterval(function () {
  console.log(new Date().toISOString(), stamp);
}, 5000);
