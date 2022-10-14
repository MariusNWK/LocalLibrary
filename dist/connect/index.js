"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
// Compile model from schema
const Book = mongoose_1.default.model("library", BookSchema, "Book");
const newBook = new Book({ title: "Alice au pays des merveilles" });
newBook.save().then(() => console.log("Book added"));
// 1. Trouver tous les lives dont le titre est Titanic
// 2. Retourner pour chaque livre trouvé, son titre
// 3. books -> tous les livres retournés avec le(s) élement(s) choisis, ici en l'occurence le titre seulement
Book.find({ title: "Titanic" }, "title", (err, books) => {
    if (err) {
        console.log("Error lors de la requête `trouver les livres dont le titre est Titanic`");
    }
    else {
        try {
            console.log(books);
            console.log("Doit afficher Titanic : " +
                (books[0] ? books[0].title || "titre introuvable" : "non défini"));
        }
        catch (err) {
            console.log(err);
        }
    }
});
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
