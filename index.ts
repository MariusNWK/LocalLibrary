import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
// import createError from "http-errors";

import usersRouter from "./routes/users";
import dateRouter from "./routes/date";
import booksRouter from "./routes/books";

import "./connect/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/date", dateRouter);
app.use("/books", booksRouter);

/*
  // doesn't work for now
  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });
*/

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
