import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.db!).then(() => {
  console.log("Connected to the database");
});
const app = express();

const port = process.env.PORT ?? 8080;
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
