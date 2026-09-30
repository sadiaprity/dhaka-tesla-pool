import process from "node:process";
import app from "./app";

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});