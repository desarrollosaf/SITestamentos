"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportes_1 = require("../controllers/reportes");
const router = (0, express_1.Router)();
router.get("/api/reporte/getinfo/", reportes_1.getinfo);
router.post("/api/reporte/getregistros/", reportes_1.getregistros);
exports.default = router;
