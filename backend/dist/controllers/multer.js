"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Campos base individuales (1 archivo por campo)
const baseFields = [
    'constancia_situacion_fiscal',
    'certificado_publico',
    'acta_matrimonio',
    'certificado_privado',
    'acta_nacimiento',
    'ine',
    'comprobante_residencia',
    'documento_residencia',
    'comprobante_domicilio',
    'curp',
    'identificacion',
    'primer_testamento_doc',
    'documento_residencia_serv'
].map(name => ({ name, maxCount: 1 }));
/*Campos repetidos por testigo (hasta 3 testigos)
const testigosDocumentFields = [
  'identificacion_t',
  'curp_t',
  'comprobante_domicilio_t'
].map(name => ({ name, maxCount: 10 })); // Ajusta maxCount según cuántos testigos permitas*/
const testigosDocumentFields = [];
for (let i = 0; i < 10; i++) {
    testigosDocumentFields.push({ name: `testigos[${i}][identificacion_t]`, maxCount: 1 });
    testigosDocumentFields.push({ name: `testigos[${i}][curp_t]`, maxCount: 1 });
    testigosDocumentFields.push({ name: `testigos[${i}][comprobante_domicilio_t]`, maxCount: 1 });
}
// Combina todos los campos
const allFields = [...baseFields, ...testigosDocumentFields];
// Configura almacenamiento de archivos
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
// Exporta el middleware para usar en tu ruta
exports.upload = (0, multer_1.default)({ storage }).fields(allFields);
