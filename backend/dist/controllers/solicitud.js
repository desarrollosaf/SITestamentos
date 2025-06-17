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
exports.getsolicitud = exports.getsolicitudes = exports.saveinfo = void 0;
const solicitud_1 = __importDefault(require("../models/solicitud"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const testigos_1 = __importDefault(require("../models/testigos"));
const fun_1 = __importDefault(require("../database/fun")); // La conexión
const dp_datospersonales_1 = require("../models/fun/dp_datospersonales");
const path_1 = __importDefault(require("path"));
dp_datospersonales_1.dp_datospersonales.initModel(fun_1.default);
const saveinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // console.log(data);
    // return 200 
    const Upassword = data.f_rfc;
    const UpasswordHash = yield bcrypt_1.default.hash(Upassword, 10);
    const newUser = yield user_1.default.create({
        name: data.f_rfc,
        email: data.correo_per,
        password: UpasswordHash,
    });
    let registro = yield dp_datospersonales_1.dp_datospersonales.findOne({
        where: { f_curp: data.f_curp }
    });
    if (!registro) {
        const test = yield dp_datospersonales_1.dp_datospersonales.create({
            f_curp: data.f_curp,
            f_rfc: data.f_rfc,
            f_nombre: data.f_nombre,
            f_primer_apellido: data.f_primer_apellido,
            f_segundo_apellido: data.f_segundo_apellido,
            f_fecha_nacimiento: data.f_fecha_nacimiento,
            estado_id: data.estado_id,
            municipio_id: data.municipio_id,
            colonia_id: data.colonia_id,
            f_domicilio: data.f_domicilio,
            numext: data.numext,
            numero_tel: data.numero_tel,
            numero_cel: data.numero_cel,
            correo_per: data.correo_per,
            f_homclave: '',
            f_cp: data.f_cp,
        });
    }
    else {
        yield registro.update({
            f_curp: data.f_curp,
            f_rfc: data.f_rfc,
            f_nombre: data.f_nombre,
            f_primer_apellido: data.f_primer_apellido,
            f_segundo_apellido: data.f_segundo_apellido,
            f_fecha_nacimiento: data.f_fecha_nacimiento,
            estado_id: data.estado_id,
            municipio_id: data.municipio_id,
            colonia_id: data.colonia_id,
            f_domicilio: data.f_domicilio,
            numext: data.numext,
            numero_tel: data.numero_tel,
            numero_cel: data.numero_cel,
            correo_per: data.correo_per,
            f_homclave: '',
            f_cp: data.f_cp,
        });
    }
    const files = req.files;
    const f_curp = data.f_curp;
    const buildPath = (field) => {
        var _a;
        const file = (_a = files[field]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? path_1.default.join('storage', f_curp, file.filename) : null;
    };
    // Crear solicitud
    const solicitudFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
    ];
    const solicitudPayload = {
        userId: newUser.id,
        lugar_nacimiento: data.lugar_nacimiento,
        fecha_envio: new Date(),
    };
    for (const field of solicitudFields) {
        solicitudPayload[field] = buildPath(field);
    }
    const solicitud = yield solicitud_1.default.create(solicitudPayload);
    // Crear testigos
    if (data.testigos === 'true') {
        const crearTestigo = (i) => {
            const prefix = `t${i}_`;
            return testigos_1.default.create({
                solicitudId: solicitud.id,
                identificacion: buildPath(`${prefix}identificacion`),
                curp: buildPath(`${prefix}curp`),
                comprobante_domicilio: buildPath(`${prefix}comprobante_domicilio`),
            });
        };
        const [test1, test2, test3] = yield Promise.all([
            crearTestigo(1),
            crearTestigo(2),
            crearTestigo(3),
        ]);
    }
    return res.status(200).json({
        message: 'Documento guardado exitosamente'
    });
});
exports.saveinfo = saveinfo;
const getsolicitudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let solicitudes = yield solicitud_1.default.findAll({
            include: [
                {
                    model: testigos_1.default,
                    as: 'testigos',
                },
                {
                    model: user_1.default,
                    as: 'user',
                }
            ]
        });
        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            const user = solicitud.user;
            if (user && user.name) {
                console.log('hola si usuario:', user.name);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: user.name },
                });
                console.log(datos);
                // Simular el include dentro de usuarios
                if (datos) {
                    user.setDataValue('datos_user', datos);
                }
            }
        }
        if (solicitudes.length > 0) {
            return res.json(solicitudes);
        }
        else {
            return res.status(404).json({ msg: `Sin datos` });
        }
    }
    catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getsolicitudes = getsolicitudes;
const getsolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let solicitudes = yield solicitud_1.default.findAll({
            where: { id: id },
            include: [
                {
                    model: testigos_1.default,
                    as: 'testigos',
                },
                {
                    model: user_1.default,
                    as: 'user',
                }
            ]
        });
        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            const user = solicitud.user;
            if (user && user.name) {
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: user.name },
                });
                // Simular el include dentro de usuarios
                if (datos) {
                    user.setDataValue('datos_user', datos);
                }
            }
        }
        if (solicitudes) {
            return res.json(solicitudes);
        }
        else {
            return res.status(404).json({ msg: `No existe el id ${id}` });
        }
    }
    catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getsolicitud = getsolicitud;
