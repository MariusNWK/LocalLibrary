import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Users route" });
});

router.get("/cool", (req: Request, res: Response) => {
  res.render("body", { title: "Tutorial Exercise", desc: "You're so cool" });
});

export default router;
