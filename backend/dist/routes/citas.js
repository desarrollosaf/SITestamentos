"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citas_1 = require("../controllers/citas");
const router = (0, express_1.Router)();
router.get("/api/citas/getservidor/:id", citas_1.getservidor);
router.get("/api/citas/validafecha/:id", citas_1.validafecha);
router.post("/api/citas/saveregistro/", citas_1.saveregistro);
exports.default = router;
