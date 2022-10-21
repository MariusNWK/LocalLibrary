import mongoose from "mongoose";

const mongoDB = "mongodb://127.0.0.1/library";
mongoose.connect(mongoDB, (err) => {
  if (err) return console.log(err);
  console.log(`Connected MongoDB`);
});

const db = mongoose.connection;

db.on("connected", () => console.log("database is connected successfully"));
db.on("disconnected", () =>
  console.log("database is disconnected successfully")
);
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: String || undefined,
});

const UserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    uppercase: true, // mettre en majuscules
    dropDups: true, // supprimer les documents dupliqués
  },
  age: {
    type: Number,
    required: true,
  },
});

// Compile model from schema
export const Book = mongoose.model("Book", BookSchema, "libraries");

export const User = mongoose.model("User", UserSchema, "users");

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
