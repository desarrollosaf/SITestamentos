import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const usuarioId = req.params.curp;
    const uploadPath = path.join(process.cwd(), 'storage', usuarioId.toString());

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Exporta como middleware que acepta múltiples campos de archivos
export const upload = multer({ storage }).fields([
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
