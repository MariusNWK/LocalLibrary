import { Router, Request, Response } from "express";
import { Book } from "../connect";

const router = Router();

router.get("/:title", (req: Request, res: Response) => {
  // 1. Trouver tous les livres dont le titre est Titanic
  // 2. Retourner pour chaque livre trouvé, son titre
  // 3. books -> tous les livres retournés avec le(s) élement(s) choisis, ici en l'occurence le titre seulement
  Book.find({ title: "Game of thrones" }, "title", (err, books) => {
    if (err) {
      console.log(
        "Error lors de la requête `trouver les livres dont le titre est Titanic`"
      );
    } else {
      try {
        console.log(books);
        console.log(
          "Doit afficher Titanic : " +
            (books[0] ? books[0].title || "titre introuvable" : "non défini")
        );
        res.status(200).json(books);
      } catch (err) {
        console.log(err);
      }
    }
  });
});

export default router;
