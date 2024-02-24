import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { logger } from "./loggers/logger";

mongoose.connect(process.env.db!).then(() => {
  logger.info("Connected to the database");
});
const app = express();

const port = process.env.PORT ?? 8080;
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
