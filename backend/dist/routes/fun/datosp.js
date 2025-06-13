"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datos_personales_1 = require("../../controllers/datos_personales");
const router = (0, express_1.Router)();
router.get("/api/datosp/getregistro/:id", datos_personales_1.getregistro);
exports.default = router;
