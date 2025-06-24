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
exports.saveregistro = exports.validafecha = exports.getservidor = void 0;
const fun_1 = __importDefault(require("../database/fun")); // La conexión
const dp_fum_datos_generales_1 = require("../models/fun/dp_fum_datos_generales");
const dp_datospersonales_1 = require("../models/fun/dp_datospersonales");
const citas_1 = __importDefault(require("../models/citas"));
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
