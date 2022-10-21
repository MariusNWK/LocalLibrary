import { Router, Request, Response } from "express";
import { User } from "../connect";
import { z } from "zod";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Users route" });
});

router.get("/cool", (req: Request, res: Response) => {
  res.render("body", { title: "Tutorial Exercise", desc: "You're so cool" });
});

router.post("/new/:username/:age", async (req: Request, res: Response) => {
  const usernameSchema = z.string();
  const ageSchema = z
    .number()
    .int({ message: "Must be an integer" })
    .positive({ message: "Age can't be equal or lower than 0" });
  try {
    const newUser = new User({
      username: req.params.username,
      age: req.params.age,
    });
    usernameSchema.parse(newUser.username);
    ageSchema.parse(newUser.age);
    await newUser.save((err, post) => {
      if (err) {
        throw err;
      }
      return res.status(201).json(post);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
  // try {
  //   await newUser.save((err, post) => {
  //     if (err) return res.status(400);
  //     else return res.status(201).json(post);
  //   });
  // } catch (err) {
  //   console.error(err);
  //   return res.status(400);
  // }
  // try {
  //   await newUser.save((err, post) => {
  //     if (err) throw err;
  //     else return res.status(201).json(post);
  //   });
  // } catch (err) {
  //   console.error(err);
  //   return res.status(400);
  // }
});

// z.string().min(5, { message: "Must be 5 or more characters long" });
// z.string().max(5, { message: "Must be 5 or fewer characters long" });
// z.string().length(5, { message: "Must be exactly 5 characters long" });
// z.string().email({ message: "Invalid email address" });
// z.string().url({ message: "Invalid url" });
// z.string().uuid({ message: "Invalid UUID" });
// z.string().startsWith("https://", { message: "Must provide secure URL" });
// z.string().endsWith(".com", { message: "Only .com domains allowed" });

// z.number().gt(5);
// z.number().gte(5); // alias .min(5)
// z.number().lt(5);
// z.number().lte(5); // alias .max(5)

// z.number().int(); // value must be an integer

// z.number().positive(); //     > 0
// z.number().nonnegative(); //  >= 0
// z.number().negative(); //     < 0
// z.number().nonpositive(); //  <= 0

// z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

export default router;
