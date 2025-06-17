"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define campos base y campos de testigos
const baseFields = [
    'acta_nacimiento',
    'acta_matrimonio',
    'identificacion',
    'curp',
    'comprobante_domicilio',
    'certificado_privado',
    'certificado_publico',
];
const testigos = ['t1', 't2', 't3'];
const testigoFields = testigos.flatMap(t => ['identificacion', 'curp', 'comprobante_domicilio'].map(f => `${t}_${f}`));
// Junta todos los campos
const allFields = [...baseFields, ...testigoFields].map(name => ({
    name,
    maxCount: 1,
}));
// Configura Multer
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
// Exporta el middleware
exports.upload = (0, multer_1.default)({ storage }).fields(allFields);
