"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import createError from "http-errors";
const users_1 = __importDefault(require("./routes/users"));
const date_1 = __importDefault(require("./routes/date"));
const books_1 = __importDefault(require("./routes/books"));
require("./connect/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use("/users", users_1.default);
app.use("/date", date_1.default);
app.use("/books", books_1.default);
/*
  // doesn't work for now
  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });
*/
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
