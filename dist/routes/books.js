"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connect_1 = require("../connect");
const router = (0, express_1.Router)();
router.get("/:title", (req, res) => {
    // 1. Trouver tous les livres dont le titre est Titanic
    // 2. Retourner pour chaque livre trouvé, son titre
    // 3. books -> tous les livres retournés avec le(s) élement(s) choisis, ici en l'occurence le titre seulement
    connect_1.Book.find({ title: "Game of thrones" }, "title", (err, books) => {
        if (err) {
            console.log("Error lors de la requête `trouver les livres dont le titre est Titanic`");
        }
        else {
            try {
                console.log(books);
                console.log("Doit afficher Titanic : " +
                    (books[0] ? books[0].title || "titre introuvable" : "non défini"));
                res.status(200).json(books);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
});
exports.default = router;
