"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connect_1 = require("../connect");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("index", { title: "Users route" });
});
router.get("/cool", (req, res) => {
    res.render("body", { title: "Tutorial Exercise", desc: "You're so cool" });
});
router.post("/new/:username/:age", (req, res) => {
    const newUser = new connect_1.User({
        username: req.params.username,
        age: req.params.age,
    });
    newUser.save((err, post) => {
        if (err)
            console.log(err);
        else
            res.status(201).json(post);
    });
});
exports.default = router;
