import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Campos base individuales (1 archivo por campo)
const baseFields = [
  'constancia_fiscal',
  'certificado_publico',
  'acta_matrimonio',
  'certificado_privado',
  'acta_nacimiento',
  'ine',
  // 'comprobante_domicilio',
  'documento_residencia',
  // 'curp',
  // 'identificacion',
  'copia_testamento',
].map(name => ({ name, maxCount: 1 }));

// Campos repetidos por testigo (hasta 3 testigos)
const testigoDocumentFields = [
  'identificacion',
  'curp',
  'comprobante_domicilio'
].map(name => ({ name, maxCount: 10 })); // Ajusta maxCount según cuántos testigos permitas

// Combina todos los campos
const allFields = [...baseFields, ...testigoDocumentFields];

// Configura almacenamiento de archivos
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

// Exporta el middleware para usar en tu ruta
export const upload = multer({ storage }).fields(allFields);
