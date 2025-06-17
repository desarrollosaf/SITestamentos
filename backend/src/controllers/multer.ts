import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
const testigoFields = testigos.flatMap(t =>
  ['identificacion', 'curp', 'comprobante_domicilio'].map(f => `${t}_${f}`)
);

// Junta todos los campos
const allFields = [...baseFields, ...testigoFields].map(name => ({
  name,
  maxCount: 1,
}));

// Configura Multer
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

// Exporta el middleware
export const upload = multer({ storage }).fields(allFields);
