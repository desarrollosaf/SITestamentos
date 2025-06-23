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
exports.getregistro = void 0;
const dp_datospersonales_1 = require("../models/fun/dp_datospersonales");
const fun_1 = __importDefault(require("../database/fun")); // La conexión
const dp_fum_datos_generales_1 = require("../models/fun/dp_fum_datos_generales");
const solicitud_1 = __importDefault(require("../models/solicitud"));
const regimen_patrimonial_1 = __importDefault(require("../models/regimen_patrimonial"));
const dp_estado_civil_1 = __importDefault(require("../models/fun/dp_estado_civil"));
dp_datospersonales_1.dp_datospersonales.initModel(fun_1.default);
dp_fum_datos_generales_1.dp_fum_datos_generales.initModel(fun_1.default);
const getregistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('si entro:', id);
    try {
        let soli = false;
        const solicitud = yield solicitud_1.default.findOne({
            where: { userId: id }
        });
        if (solicitud) {
            soli = true;
        }
        let registro = yield dp_datospersonales_1.dp_datospersonales.findOne({
            where: { f_rfc: id }
        });
        if (!registro) {
            registro = yield dp_fum_datos_generales_1.dp_fum_datos_generales.findOne({
                where: { f_rfc: id }
            });
            if (!registro) {
                return res.status(500).json({ error: 'No se tiene ningun registro' });
            }
        }
        const regimen = yield regimen_patrimonial_1.default.findAll();
        const civil = yield dp_estado_civil_1.default.findAll();
        return res.json({
            msg: `Lista obtenida exitosamente`,
            data: registro,
            regimen: regimen,
            estadocivil: civil,
            solicitud: soli
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getregistro = getregistro;
