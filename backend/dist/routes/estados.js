"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colonias_1 = require("../controllers/colonias");
const router = (0, express_1.Router)();
router.get("/api/estados/getcodigo/:id", colonias_1.getRegistros);
exports.default = router;
