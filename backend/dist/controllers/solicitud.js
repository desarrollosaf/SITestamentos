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
exports.saveinfo = void 0;
const solicitud_1 = require("../models/solicitud");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const testigos_1 = require("../models/testigos");
const saveinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const { data } = req.body;
    const Upassword = data.curp;
    const UpasswordHash = yield bcrypt_1.default.hash(Upassword, 10);
    const newUser = yield user_1.default.create({
        name: data.curp,
        email: data.curp,
        password: UpasswordHash,
    });
    const files = req.files;
    const solicitud = yield solicitud_1.Solicitud.create({
        userId: newUser.id,
        lugar_nacimiento: data.lugar_nacimiento,
        acta_nacimiento: (_b = (_a = files['acta_nacimiento']) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path,
        acta_matrimonio: (_d = (_c = files['acta_matrimonio']) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.path,
        identificacion: (_f = (_e = files['identificacion']) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.path,
        curp: (_h = (_g = files['curp']) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.path,
        comprobante_domicilio: (_k = (_j = files['comprobante_domicilio']) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.path,
        certificado_privado: (_m = (_l = files['certificado_privado']) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.path,
        certificado_publico: (_p = (_o = files['certificado_publico']) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.path,
        fecha_envio: new Date(),
    });
    for (const testigo of data.testigos) {
        const test = yield testigos_1.Testigo.create({
            solicitudId: solicitud.id,
            nombre: testigo.nombre,
            rfc: (_r = (_q = files['rfc']) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.path,
            identificacion: (_t = (_s = files['identificacion']) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.path,
            curp: (_v = (_u = files['curp']) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.path,
            comprobante_domicilio: (_x = (_w = files['comprobante_domicilio']) === null || _w === void 0 ? void 0 : _w[0]) === null || _x === void 0 ? void 0 : _x.path,
        });
    }
    return res.status(201).json({
        message: 'Documento guardado exitosamente'
    });
});
exports.saveinfo = saveinfo;
