"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("index", { title: "Users route" });
});
router.get("/cool", (req, res) => {
    res.render("body", { title: "Tutorial Exercise", desc: "You're so cool" });
});
exports.default = router;
