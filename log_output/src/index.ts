import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
