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
exports.getcitas = exports.getCita = exports.saveregistro = exports.validafecha = exports.getservidor = void 0;
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
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const formatDate = (date) => date.toISOString().split('T')[0];
        const citas = yield citas_1.default.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.in]: [formatDate(today), formatDate(tomorrow)]
                }
            }
        });
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
