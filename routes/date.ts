import { Router, Request, Response } from "express";
import moment from "moment";
import "moment/locale/fr";

const router = Router();

moment.locale("fr");

router.get("/", (req: Request, res: Response) => {
  const date = moment().format("LL hh:mm:ss");
  res.render("body", { title: date });
});

export default router;
