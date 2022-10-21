"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB = "mongodb://127.0.0.1/library";
mongoose_1.default.connect(mongoDB, (err) => {
    if (err)
        return console.log(err);
    console.log(`Connected MongoDB`);
});
const db = mongoose_1.default.connection;
db.on("connected", () => console.log("database is connected successfully"));
db.on("disconnected", () => console.log("database is disconnected successfully"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Define a schema
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: String || undefined,
});
const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: String || undefined,
    age: Number || undefined,
});
// Compile model from schema
exports.Book = mongoose_1.default.model("Book", BookSchema, "libraries");
exports.User = mongoose_1.default.model("User", UserSchema, "users");
/* Schema examples

const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } },
});

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no eggs?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea", "Water"],
  },
});

*/
