"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitud_1 = require("../controllers/solicitud");
const multer_1 = require("../controllers/multer");
const router = (0, express_1.Router)();
router.post("/api/solicitudes/create", multer_1.upload, solicitud_1.saveinfo);
exports.default = router;
