import multer from 'multer';
import path from 'path';
import fs from 'fs';



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


const testigosDocumentFields = [];

for (let i = 0; i < 10; i++) {
  testigosDocumentFields.push({ name: `testigos[${i}][identificacion_t]`, maxCount: 1 });
  testigosDocumentFields.push({ name: `testigos[${i}][curp_t]`, maxCount: 1 });
  testigosDocumentFields.push({ name: `testigos[${i}][comprobante_domicilio_t]`, maxCount: 1 });
}

const allFields = [...baseFields, ...testigosDocumentFields];

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


export const upload = multer({ storage }).fields(allFields);
