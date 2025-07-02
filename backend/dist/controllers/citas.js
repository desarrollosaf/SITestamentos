"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcitasagrupadas = exports.atendercita = exports.atenderconliga = exports.getcitas = exports.getCita = exports.saveregistro = exports.validafecha = exports.getservidor = void 0;
const fun_1 = __importDefault(require("../database/fun")); // La conexión
const dp_fum_datos_generales_1 = require("../models/fun/dp_fum_datos_generales");
const dp_datospersonales_1 = require("../models/fun/dp_datospersonales");
const citas_1 = __importDefault(require("../models/citas"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const s_usuario_1 = __importDefault(require("../models/saf/s_usuario"));
const t_dependencia_1 = __importDefault(require("../models/saf/t_dependencia"));
const t_direccion_1 = __importDefault(require("../models/saf/t_direccion"));
const t_departamento_1 = __importDefault(require("../models/saf/t_departamento"));
const mailer_1 = require("../utils/mailer");
dp_datospersonales_1.dp_datospersonales.initModel(fun_1.default);
dp_fum_datos_generales_1.dp_fum_datos_generales.initModel(fun_1.default);
const getservidor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let registro = yield dp_datospersonales_1.dp_datospersonales.findOne({
            where: { f_curp: id }
        });
        if (!registro) {
            registro = yield dp_fum_datos_generales_1.dp_fum_datos_generales.findOne({
                where: { f_curp: id }
            });
            if (!registro) {
                return res.status(500).json({ error: 'existe un servidor publico en el curp', id });
            }
        }
        return res.json({
            msg: `si existe el servidor`,
            estatus: '200'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getservidor = getservidor;
const MAX_CITAS = 20;
const validafecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const totalCitas = yield citas_1.default.count({
            where: { fecha: id }
        });
        const disponibles = MAX_CITAS - totalCitas;
        if (totalCitas >= MAX_CITAS) {
            return res.status(400).json({
                error: 'Ya no se pueden agendar más citas para esta fecha. Límite alcanzado (20).'
            });
        }
        return res.json({
            msg: `Sí tenemos disponibilidad`,
            disponibles,
            estatus: '200'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.validafecha = validafecha;
const saveregistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const citasser = yield citas_1.default.findAll({
            where: {
                rfc: data.rfc,
                estatus: 0
            }
        });
        if (citasser.length > 0) {
            return res.status(400).json({ error: 'cuentas con una solicitud', estatus: 400 });
        }
        const cita = yield citas_1.default.create({
            rfc: data.rfc,
            fecha: data.fecha,
            hora: data.hora,
            estatus: 0,
        });
        return res.json({
            msg: `cita guardada`,
            estatus: 200
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'No  se guardo' });
    }
});
exports.saveregistro = saveregistro;
const getCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const citasser = yield citas_1.default.findAll({
            where: { rfc: id }
        });
        const usuario = yield dp_datospersonales_1.dp_datospersonales.findAll({
            where: { f_rfc: id },
            attributes: [
                'correo_ins',
                'correo_per',
                'numero_tel',
                'numero_cel',
                [sequelize_2.Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
            ],
            raw: true
        });
        return res.json({
            msg: `si existe el servidor`,
            citas: citasser,
            dtaosuser: usuario
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getCita = getCita;
const getcitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha } = req.params;
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const formatDate = (date) => date.toISOString().split('T')[0];
        const citas = yield citas_1.default.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.eq]: fecha
                }
            },
            order: [['fecha', 'ASC']]
        });
        console.log(citas);
        for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: cita.rfc },
                    attributes: [
                        'correo_ins',
                        'correo_per',
                        'numero_tel',
                        'numero_cel',
                        [sequelize_2.Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
                    ],
                    raw: true
                });
                if (datos) {
                    cita.setDataValue('datos_user', datos);
                }
            }
        }
        for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);
                const datos = yield s_usuario_1.default.findOne({
                    where: { N_Usuario: cita.rfc },
                    attributes: [
                        'N_Usuario',
                    ],
                    include: [
                        {
                            model: t_dependencia_1.default,
                            as: 'dependencia',
                            attributes: [
                                'nombre_completo',
                            ],
                        },
                        {
                            model: t_direccion_1.default,
                            as: 'direccion',
                            attributes: [
                                'nombre_completo',
                            ],
                        },
                        {
                            model: t_departamento_1.default,
                            as: 'departamento',
                            attributes: [
                                'nombre_completo',
                            ],
                        },
                    ],
                });
                if (datos) {
                    cita.setDataValue('dependencia', datos);
                }
            }
        }
        return res.json({
            msg: `si existe el servidor`,
            citas: citas,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getcitas = getcitas;
const atenderconliga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const usuario = yield dp_datospersonales_1.dp_datospersonales.findOne({
            where: { f_rfc: data.rfc },
            attributes: [
                'correo_ins',
                'correo_per',
                'f_nombre',
                'f_primer_apellido',
                'f_segundo_apellido',
            ],
            raw: true
        });
        let correo = usuario ? (usuario.correo_per || usuario.correo_ins) : null;
        if (!usuario) {
            return res.status(400).json({ error: 'No se encontró el usuario' });
        }
        if (!correo) {
            return res.status(400).json({ error: 'Sin correos' });
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const meses = [
                    "enero", "febrero", "marzo", "abril", "mayo", "junio",
                    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                ];
                const hoy = new Date();
                const fechaFormateada = `Toluca de Lerdo, México; a ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}.`;
                const contenido = `
           <div class="container">
            <p  class="pderecha" >${fechaFormateada}</p>
            <p>C. ${usuario.f_nombre} ${usuario.f_primer_apellido} ${usuario.f_segundo_apellido},</p>
            <p>${data.texto}</p>
            <p>
              Liga: ${data.enlace}
            </p>
            <p>Atentamente,<br><strong>Poder Legislativo del Estado de México</strong></p>
          </div>
        `;
                let htmlContent = generarHtmlCorreo(contenido);
                yield (0, mailer_1.sendEmail)(correo, 'Correo de notificacion', htmlContent);
                console.log('Correo enviado correctamente');
            }
            catch (err) {
                console.error('Error al enviar correo:', err);
            }
        }))();
        const citasser = yield citas_1.default.findOne({
            where: { id: data.citaid }
        });
        if (!citasser) {
            return res.status(404).json({ msg: 'Cita no encontrado' });
        }
        yield citasser.update({
            estatus: 1
        });
        return res.json({
            msg: `Guardado corectamente`,
            estatus: 200,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.atenderconliga = atenderconliga;
function generarHtmlCorreo(contenidoHtml) {
    return `
    <html>
      <head>
        <style>
             body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              max-width: 600px;
              margin: 40px auto;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              padding: 30px;
            }
            h1 {
              color: #2c3e50;
              font-size: 22px;
              margin-bottom: 20px;
            }
            p {
              color: #4d4d4d;
              font-size: 16px;
              line-height: 1.5;
            }
            .credentials {
              background-color: #ecf0f1;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              font-family: monospace;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              margin-top: 20px;
            }
            .footer {
              font-size: 12px;
              color: #999999;
              margin-top: 30px;
              text-align: center;
            }
               .pderecha{
            text-align: right;
            }
        </style>
      </head>
      <body>
        <div style="text-align: center;">
          <img 
            src="https://congresoedomex.gob.mx/storage/images/congreso.png" 
            alt="Logo"
            style="display: block; margin: 0 auto; width: 300px; height: auto;"
          >
        </div>
        <div class="content">
          ${contenidoHtml}
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} SITestamento. Todos los derechos reservados.
        </div>
      </body>
    </html>
  `;
}
const atendercita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const citasser = yield citas_1.default.findOne({
            where: { id: id }
        });
        if (!citasser) {
            return res.status(404).json({ msg: 'Cita no encontrado' });
        }
        yield citasser.update({
            estatus: 1
        });
        return res.json({
            msg: `Guardado corectamente`,
            estatus: 200,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.atendercita = atendercita;
const getcitasagrupadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const citas = yield citas_1.default.findAll({
        attributes: [
            'fecha',
            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.col('id')), 'total_citas']
        ],
        group: ['fecha'],
        order: [['fecha', 'ASC']]
    });
    return res.json({
        msg: `siuuu`,
        citas: citas
    });
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    // }
});
exports.getcitasagrupadas = getcitasagrupadas;
