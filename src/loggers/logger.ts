import winston from "winston";
import "winston-mongodb";
// import "dotenv/config";

winston.addColors({ info: ["green", "bold"], error: ["red", "bold"] });
const myFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.json(),
  winston.format.printf(
    (info) => `${new Date(info.timestamp)} ${info.level} : ${info.message}`
  )
);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), myFormat),
    }),
    new winston.transports.MongoDB({
      db: process.env.db!,
      options: {
        useUnifiedTopology: true,
      },
    }),
    new winston.transports.File({
      filename: "logfile.log",
      dirname: "log/",
      format: myFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      dirname: "log/",
      format: myFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "rejections.log",
      dirname: "log/",
      format: myFormat,
    }),
  ],
});
