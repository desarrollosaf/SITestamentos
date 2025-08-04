"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitud_1 = require("../controllers/solicitud");
const multer_1 = require("../controllers/multer");
const verifyAccessToken_1 = __importDefault(require("../middlewares/verifyAccessToken"));
const router = (0, express_1.Router)();
router.post("/api/solicitudes/create/:curp", multer_1.upload, solicitud_1.saveinfo);
router.get("/api/solicitudes/getsolicitudes/", solicitud_1.getsolicitudes);
router.get("/api/solicitudes/getsolicitud/:id", solicitud_1.getsolicitud);
router.get('/api/solicitudes/getsolicitudesapi/', verifyAccessToken_1.default, solicitud_1.getsolicitudesapi);
router.post("/api/solicitudes/saveprogreso/:curp", multer_1.upload, solicitud_1.saveprogreso);
exports.default = router;
