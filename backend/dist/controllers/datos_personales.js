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
dp_datospersonales_1.dp_datospersonales.initModel(fun_1.default);
dp_fum_datos_generales_1.dp_fum_datos_generales.initModel(fun_1.default);
const getregistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        let registro = yield dp_datospersonales_1.dp_datospersonales.findOne({
            where: { f_curp: id }
        });
        if (!registro) {
            registro = yield dp_fum_datos_generales_1.dp_fum_datos_generales.findOne({
                where: { f_curp: id }
            });
            if (!registro) {
                return res.status(500).json({ error: 'No se tiene ningun registro' });
            }
        }
        return res.json({
            msg: `Lista obtenida exitosamente`,
            data: registro
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getregistro = getregistro;
