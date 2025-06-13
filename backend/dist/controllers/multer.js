"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const usuarioId = req.params.curp;
        const uploadPath = path_1.default.join(process.cwd(), 'storage', usuarioId.toString());
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});
// Exporta como middleware que acepta múltiples campos de archivos
exports.upload = (0, multer_1.default)({ storage }).fields([
    { name: 'acta_nacimiento', maxCount: 1 },
    { name: 'acta_matrimonio', maxCount: 1 },
    { name: 'identificacion', maxCount: 1 },
    { name: 'comprobante_domicilio', maxCount: 1 },
    { name: 'certificado_privado', maxCount: 1 },
    { name: 'certificado_publico', maxCount: 1 },
    { name: 'rfc', maxCount: 1 },
    { name: 'identificacion', maxCount: 1 },
    { name: 'curp', maxCount: 1 },
    { name: 'comprobante_domicilio', maxCount: 1 },
]);
