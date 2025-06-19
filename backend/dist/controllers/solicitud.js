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
const documentos_1 = __importDefault(require("../models/documentos"));
const tipos_documentos_1 = __importDefault(require("../models/tipos_documentos"));
const padres_1 = __importDefault(require("../models/padres"));
const matrimonios_1 = __importDefault(require("../models/matrimonios"));
const hijos_1 = __importDefault(require("../models/hijos"));
const testamentos_pasados_1 = __importDefault(require("../models/testamentos_pasados"));
const herederos_1 = __importDefault(require("../models/herederos"));
const herederos_sustitutos_1 = __importDefault(require("../models/herederos_sustitutos"));
const albaceas_1 = __importDefault(require("../models/albaceas"));
const tutor_descendientes_1 = __importDefault(require("../models/tutor_descendientes"));
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
            estadocivil_id: data.estadocivil_id
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
            estadocivil_id: data.estadocivil_id
        });
    }
    const files = req.files;
    const f_curp = data.f_curp;
    const buildPath = (field) => {
        var _a;
        const file = (_a = files[field]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? path_1.default.join('storage', f_curp, file.filename) : null;
    };
    const solicituddata = {
        userId: newUser.id,
        fecha_envio: new Date(),
        documento_residencia: buildPath(`documento_residencia`),
        nacionalidad: data.nacionalidad === '2' ? data.otranacionalidad : 'Mexicana',
    };
    const solicitud = yield solicitud_1.default.create(solicituddata);
    const documentosFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
        'ine'
    ];
    const documentosPaths = {};
    for (const field of documentosFields) {
        const filePath = buildPath(field);
        documentosPaths[field] = filePath;
        if (filePath) {
            const tipodoc = yield tipos_documentos_1.default.findOne({
                where: { tipo: field }
            });
            if (!tipodoc) {
                throw new Error(`TipoDocumento no encontrado para tipo: ${field}`);
            }
            yield documentos_1.default.create({
                solicitudId: solicitud.id,
                tipo_documento: tipodoc.id,
                archivo_path: filePath,
            });
        }
    }
    const padre = yield padres_1.default.create({
        solicitudId: solicitud.id,
        tipo: '1',
        nombre_completo: data.nombre_padre,
        vive: data.vivepadre,
        nacionalidad: data.nacionalidadpadre === '2' ? data.otranacionalidadpadre : 'Mexicana',
    });
    const madre = yield padres_1.default.create({
        solicitudId: solicitud.id,
        tipo: '2',
        nombre_completo: data.nombre_madre,
        vive: data.vivemadre,
        nacionalidad: data.nacionalidadmadre === '2' ? data.otranacionalidadmadre : 'Mexicana',
    });
    const primerasnupcias = yield matrimonios_1.default.create({
        solicitudId: solicitud.id,
        orden: 1,
        conyuge_nombre: data.conyuge_nombre,
        regimen_patrimonial: data.regimen_patrimonial,
        vive: data.vivemadre,
    });
    for (const hijosprimer of data.hijosprimer) {
        const hijosprimerasnupcias = yield hijos_1.default.create({
            solicitudId: solicitud.id,
            matrimonioId: primerasnupcias.id,
            nombre_completo: hijosprimer.nombre,
            edad: hijosprimer.edad,
            vive: hijosprimer.vivemadre,
            reconocido: true,
            fuera_de_matrimonio: false,
            nombre_fuera: ''
        });
    }
    const segundasnupcias = yield matrimonios_1.default.create({
        solicitudId: solicitud.id,
        orden: 2,
        conyuge_nombre: data.conyuge_nombre,
        regimen_patrimonial: data.regimen_patrimonial2,
        vive: data.vivemadre2,
    });
    for (const hijossegundos of data.hisjossegundo) {
        const hijossegundasnupcias = yield hijos_1.default.create({
            solicitudId: solicitud.id,
            matrimonioId: segundasnupcias.id,
            nombre_completo: hijossegundos.nombre,
            edad: hijossegundos.edad,
            vive: hijossegundos.vivemadre,
            reconocido: true,
            fuera_de_matrimonio: false,
            nombre_fuera: ''
        });
    }
    for (const hijosfuera of data.hijosfuera) {
        const hijosfueramatrimonio = yield hijos_1.default.create({
            solicitudId: solicitud.id,
            matrimonioId: '',
            nombre_completo: hijosfuera.nombre,
            edad: hijosfuera.edad,
            vive: hijosfuera.vivemadre,
            reconocido: false,
            fuera_de_matrimonio: true,
            nombre_fuera: data.nombre_fuera
        });
    }
    if (data.primer_testamento == false) {
        const tienetestamento = yield testamentos_pasados_1.default.create({
            solicitudId: solicitud.id,
            fecha_tramite: data.fecha_tramite,
            notaria: data.notaria,
            instrumento_volumen: data.instrumento_volumen,
            path_testamento: buildPath(`path_testamento`),
        });
    }
    if (data.herederos) {
        for (const heredero of data.herederos) {
            const herederos = yield herederos_1.default.create({
                solicitudId: solicitud.id,
                nombre_completo: heredero.nombre_completo_heredero,
                porcentaje: heredero.porcentaje,
                derecho_acrecer: heredero.derecho_acrecer,
                edad: heredero.edad,
                parentesco: heredero.parentesco
            });
        }
    }
    if (data.herederossustitutos) {
        for (const herederosustituto of data.herederossustitutos) {
            const herederosustitut = yield herederos_sustitutos_1.default.create({
                solicitudId: solicitud.id,
                nombre_completo: herederosustituto.nombre_completo_heredero,
                nombre_completo_asustituir: herederosustituto.nombre_completo_asustituir,
                derecho_acrecer: herederosustituto.derecho_acrecer
            });
        }
    }
    const albacea = yield albaceas_1.default.create({
        solicitudId: solicitud.id,
        nombre_completo: data.nombre_completo_albacea,
        a_su_fata: data.a_su_falta,
    });
    if (data.heredero_menor_edad == 1) {
        const tutor = yield tutor_descendientes_1.default.create({
            solicitudId: solicitud.id,
            nombre: data.nombre_tutor,
            nombre_tutor_sustituto: data.nombre_tutor_sustituto,
            nombre_curador: data.nombre_curador,
            nombre_curador_falta: data.nombre_curador_falta,
        });
    }
    const buildIndexedPath = (field, index) => {
        var _a;
        const file = (_a = files[field]) === null || _a === void 0 ? void 0 : _a[index];
        return file ? path_1.default.join('storage', data.f_curp, file.filename) : null;
    };
    if (data.testigos) {
        for (let i = 0; i < data.testigos.length; i++) {
            const itemtest = data.testigos[i];
            const testig = yield testigos_1.default.create({
                solicitudId: solicitud.id,
                nombre_completo: itemtest.nombre_completo,
                nacionalidad: itemtest.nacionalidad,
                fecha_naciento: itemtest.fecha_naciento,
                lugar_nacimiento: itemtest.lugar_nacimiento,
                curp_dato: itemtest.curp_dato,
                estado_civil: itemtest.estado_civil,
                ocupacion: itemtest.ocupacion,
                domicilio: itemtest.domicilio,
                cp: itemtest.cp,
                telefono: itemtest.telefono,
                rfc: itemtest.rfc,
                identificacion: buildIndexedPath('identificacion', i),
                curp: buildIndexedPath('curp', i),
                comprobante_domicilio: buildIndexedPath('comprobante_domicilio', i)
            });
        }
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
