import { Router, Request, Response } from "express";
import { User } from "../connect";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Users route" });
});

router.get("/cool", (req: Request, res: Response) => {
  res.render("body", { title: "Tutorial Exercise", desc: "You're so cool" });
});

router.post("/new/:username/:age", (req: Request, res: Response) => {
  const newUser = new User({
    username: req.params.username,
    age: req.params.age,
  });
  newUser.save((err, post) => {
    if (err) console.log(err);
    else res.status(201).json(post);
  });
});

export default router;
