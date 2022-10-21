"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/fr");
const router = (0, express_1.Router)();
moment_1.default.locale("fr");
router.get("/", (req, res) => {
    const date = (0, moment_1.default)().format("LL hh:mm:ss");
    res.render("body", { title: date });
});
exports.default = router;
