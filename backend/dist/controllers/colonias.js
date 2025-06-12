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
exports.getRegistros = void 0;
const dp_estados_1 = require("../models/fun/dp_estados");
const fun_1 = __importDefault(require("../database/fun")); // La conexión
const dp_municipios_1 = require("../models/fun/dp_municipios");
const dp_colonias_1 = require("../models/fun/dp_colonias");
// Llama a initModel
dp_estados_1.dp_estados.initModel(fun_1.default);
dp_municipios_1.dp_municipios.initModel(fun_1.default);
dp_colonias_1.dp_colonias.initModel(fun_1.default);
const getRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const colonias = yield dp_colonias_1.dp_colonias.findAll({
            attributes: [
                ['id', 'idcol'],
                ['nombre', 'colon'],
            ],
            where: {
                codigo_postal: id,
            },
            include: [
                {
                    model: dp_municipios_1.dp_municipios,
                    as: 'municipio_dp_municipio',
                    required: false,
                    attributes: [
                        ['id', 'municipioid'],
                        ['nombre', 'municipionom'],
                    ],
                    include: [
                        {
                            model: dp_estados_1.dp_estados,
                            as: 'estado_dp_estado',
                            required: false,
                            attributes: [
                                ['id', 'estadoid'],
                                ['nombre', 'estadonom'],
                            ],
                        },
                    ],
                },
            ],
        });
        return res.json({
            msg: `Lista obtenida exitosamente`,
            data: colonias
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
    }
});
exports.getRegistros = getRegistros;
