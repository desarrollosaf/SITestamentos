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
exports.getregistros = exports.getinfo = void 0;
const solicitud_1 = __importDefault(require("../models/solicitud"));
const sequelize_1 = require("sequelize");
const s_usuario_1 = __importDefault(require("../models/saf/s_usuario"));
const getinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const opciones = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    const fechaFormateada = new Date().toLocaleString('es-MX', opciones);
    const total = yield solicitud_1.default.count();
    return res.json({
        fechaactual: fechaFormateada,
        total: total
    });
});
exports.getinfo = getinfo;
const getregistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_inicial, fecha_final, dependencia } = req.body;
    const fechaInicio = new Date(`${fecha_inicial}T00:00:00`);
    const fechaFin = new Date(`${fecha_final}T23:59:59`);
    const usuarios = yield s_usuario_1.default.findAll({
        where: { id_Dependencia: dependencia },
        attributes: ['N_Usuario']
    });
    const idsUsuarios = usuarios
        .map(u => u.N_Usuario)
        .filter((id) => id !== null);
    const solicitudes = yield solicitud_1.default.findAll({
        attributes: [
            [(0, sequelize_1.fn)('DATE', (0, sequelize_1.col)('createdAt')), 'fecha'], // Agrupa solo por día (sin hora)
            [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('id')), 'total']
        ],
        where: {
            userId: {
                [sequelize_1.Op.in]: idsUsuarios
            },
            createdAt: {
                [sequelize_1.Op.between]: [fechaInicio, fechaFin]
            }
        },
        group: [(0, sequelize_1.fn)('DATE', (0, sequelize_1.col)('createdAt'))], // Agrupación por día
        order: [[(0, sequelize_1.fn)('DATE', (0, sequelize_1.col)('createdAt')), 'ASC']]
    });
    const totalGeneral = solicitudes.reduce((acc, item) => acc + parseInt(item.getDataValue('total')), 0);
    return res.json({
        total: totalGeneral,
        porfecha: solicitudes,
    });
});
exports.getregistros = getregistros;
