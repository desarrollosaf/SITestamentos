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
exports.saveprogreso = exports.getsolicitudesapi = exports.getsolicitud = exports.getsolicitudes = exports.saveinfo = void 0;
const solicitud_1 = __importDefault(require("../models/solicitud"));
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
const hijos_2 = __importDefault(require("../models/hijos"));
const dp_estado_civil_1 = __importDefault(require("../models/fun/dp_estado_civil"));
dp_datospersonales_1.dp_datospersonales.initModel(fun_1.default);
const saveinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log('save');
    console.log(data);
    const Upassword = data.f_rfc;
    const UpasswordHash = yield bcrypt_1.default.hash(Upassword, 10);
    /*const newUser = await User.create({
      name:  data.f_rfc,
      email:  data.correo_per,
      password: UpasswordHash,
    });*/
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
            estadocivil_id: data.estado_civil
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
            estadocivil_id: data.estado_civil
        });
    }
    const files = req.files;
    const f_curp = data.f_curp;
    const buildPath = (field) => {
        var _a;
        const file = (_a = files[field]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? path_1.default.join('storage', f_curp, file.filename) : null;
    };
    let solicitud = null;
    try {
        solicitud = yield solicitud_1.default.create({
            userId: data.f_rfc,
            es_primer_testamento: data.primer_testamento,
            sabe_leer: data.sabe_leer,
            sabe_escribir: data.sabe_escribir,
            puede_hablar: data.puede_hablar,
            puede_ver: data.puede_ver,
            puede_oir: data.puede_oir,
            heredero_menor_edad: data.menor_de_edad,
            documento_identifica: data.documento_identifica,
            numero_documento_identifica: data.numero_documento_identifica,
            nacionalidad: data.nacionalidad_serv,
            indique_nacionalidad_serv: data.indique_nacionalidad_serv,
            documento_residencia: data.documento_residencia_serv,
            dificultad_comunicacion: data.presenta_dificultad,
        });
    }
    catch (error) {
        console.error('❌ Error al crear la solicitud:', error);
    }
    //const solicitud = await Solicitud.create(solicituddata);
    const documentosFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
        'ine', 'comprobante_residencia', 'constancia_situacion_fiscal'
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
    try {
        const padre = yield padres_1.default.create({
            solicitudId: solicitud.id,
            tipo: '1',
            nombre: data.f_nombre_padre,
            primer_apellido: data.f_primer_apellido_padre,
            segundo_apellido: data.f_segundo_apellido_padre,
            vive: data.vive_padre,
            nacionalidad: data.nacionalidad_padre,
            especifique_nacionalidad: data.especifique_nac_padre,
        });
    }
    catch (error) {
        console.error('❌ Error al crear el padre :', error);
    }
    const madre = yield padres_1.default.create({
        solicitudId: solicitud.id,
        tipo: '2',
        nombre: data.f_nombre_madre,
        primer_apellido: data.f_primer_apellido_madre,
        segundo_apellido: data.f_segundo_apellido_pmadre,
        vive: data.vive_madre,
        nacionalidad: data.nacionalidad_madre,
        especifique_nacionalidad: data.especifique_nac_madre,
    });
    const primerasnupcias = yield matrimonios_1.default.create({
        solicitudId: solicitud.id,
        orden: 1,
        nombre: data.nombre_primer_nup,
        primer_apellido: data.primer_apellido_primer_nup,
        segundo_apellido: data.segundo_apellido_primer_nup,
        regimen_patrimonial: data.regimen_patrimonial_primer_nup,
        vive: data.vive_primer_nup,
    });
    if (data.hijosPrimerMatrimonio) {
        for (const hijosprimer of data.hijosPrimerMatrimonio) {
            const hijosprimerasnupcias = yield hijos_1.default.create({
                solicitudId: solicitud.id,
                matrimonioId: primerasnupcias.id,
                nombre: hijosprimer.hijo_nombre_primer_nup,
                primer_apellido: hijosprimer.hijo_primer_apellido_primer_nup,
                segundo_apellido: hijosprimer.hijo_segundo_apellido_primer_nup,
                edad: hijosprimer.hijo_edad_primer_nup,
                vive: hijosprimer.hijo_vf_primer_nup,
                reconocido: true,
                fuera_de_matrimonio: false,
                nombre_fuera: '',
                primer_apellido_fuera_matri: '',
                segundo_apellido_fuera_matri: ''
            });
        }
    }
    if (data.nombre_dos_nup) {
        let segundasnupcias = yield matrimonios_1.default.create({
            solicitudId: solicitud.id,
            orden: 2,
            nombre: data.nombre_dos_nup,
            primer_apellido: data.primer_apellido_dos_nup,
            segundo_apellido: data.segundo_apellido_dos_nup,
            regimen_patrimonial: data.regimen_patrimonial_dos_nup,
            vive: data.vive_dos_nup,
        });
        if (data.hijosSegundoMatrimonio) {
            for (const hijossegundos of data.hijosSegundoMatrimonio) {
                const hijossegundasnupcias = yield hijos_1.default.create({
                    solicitudId: solicitud.id,
                    matrimonioId: segundasnupcias.id,
                    nombre: hijossegundos.hijo_nombre_dos_nup,
                    primer_apellido: hijossegundos.hijo_primer_apellido_dos_nup,
                    segundo_apellido: hijossegundos.hijo_segundo_apellido_dos_nup,
                    edad: hijossegundos.hijo_edad_dos_nup,
                    vive: hijossegundos.hijo_vf_dos_nup,
                    reconocido: true,
                    fuera_de_matrimonio: false,
                    nombre_fuera: '',
                    primer_apellido_fuera_matri: '',
                    segundo_apellido_fuera_matri: ''
                });
            }
        }
    }
    try {
        if (data.hijosFueraMatrimonio) {
            for (const hijosfuera of data.hijosFueraMatrimonio) {
                const hijosfueramatrimonio = yield hijos_1.default.create({
                    solicitudId: solicitud.id,
                    nombre: hijosfuera.fuera_hijo_nombre,
                    primer_apellido: hijosfuera.fuera_hijo_primer_apellido,
                    segundo_apellido: hijosfuera.fuera_hijo_segundo_apellido,
                    edad: hijosfuera.fuera_hijo_edad,
                    vive: hijosfuera.fuera_hijo_vf,
                    reconocido: false,
                    fuera_de_matrimonio: true,
                    nombre_fuera: data.nombre_fuera_matri,
                    primer_apellido_fuera_matri: data.primer_apellido_fuera_matri,
                    segundo_apellido_fuera_matri: data.segundo_apellido_fuera_matri
                });
            }
        }
    }
    catch (error) {
        console.error('❌ Error al crear el bastardo :', error);
    }
    try {
        if (data.primer_testamento == false) {
            const tienetestamento = yield testamentos_pasados_1.default.create({
                solicitudId: solicitud.id,
                fecha_tramite: data.fecha_primer_testamento,
                notaria: data.notaria_primer_testamento,
                instrumento_volumen: data.instrumento_primer_testamento,
                path_testamento: buildPath(`primer_testamento_doc`),
            });
        }
    }
    catch (error) {
        console.error('❌ Error al crear el TESTAMENTO :', error);
    }
    try {
        if (data.herederos) {
            for (const heredero of data.herederos) {
                const herederos = yield herederos_1.default.create({
                    solicitudId: solicitud.id,
                    nombre_heredero: heredero.nombre_heredero,
                    primer_apellido_heredero: heredero.primer_apellido_heredero,
                    segundo_apellido_heredero: heredero.segundo_apellido_heredero,
                    porcentaje: heredero.porcentaje_heredero,
                    edad: heredero.edad_heredero,
                    parentesco: heredero.parentesco_heredero,
                    derecho_acrecer: data.derecho_acrecer,
                });
            }
        }
    }
    catch (error) {
        console.error('❌ Error al crear el HEREDEROS :', error);
    }
    if (data.herederoSustituto) {
        for (const herederosustituto of data.herederoSustituto) {
            const herederosustitut = yield herederos_sustitutos_1.default.create({
                solicitudId: solicitud.id,
                nombre_sustituto: herederosustituto.nombre_sustituto,
                primer_apellido_sustituto: herederosustituto.primer_apellido_sustituto,
                segundo_apellido_sustituto: herederosustituto.segundo_apellido_sustituto,
                nombre_a_sustituir: herederosustituto.nombre_a_sustituir,
                primer_apellido_a_sustituir: herederosustituto.primer_apellido_a_sustituir,
                segundo_apellido_a_sustituir: herederosustituto.segundo_apellido_a_sustituir,
                derecho_acrecer: data.derecho_acrecer_sustituto
            });
        }
    }
    const albacea = yield albaceas_1.default.create({
        solicitudId: solicitud.id,
        nombre_albacea: data.nombre_albacea,
        primer_apellido_albacea: data.primer_apellido_albacea,
        segundo_apellido_albacea: data.segundo_apellido_albacea,
        nombre_falta_albacea: data.nombre_falta_albacea,
        primer_apellido_falta_albacea: data.primer_apellido_falta_albacea,
        segundo_apellido_falta_albacea: data.segundo_apellido_falta_albacea,
    });
    if (data.menor_de_edad == 1) {
        const tutor = yield tutor_descendientes_1.default.create({
            solicitudId: solicitud.id,
            nombre_tutor: data.nombre_tutor,
            primer_apellido_tutor: data.primer_apellido_tutor,
            segundo_apellido_tutor: data.segundo_apellido_tutor,
            nombre_tutor_sustituto: data.nombre_tutor_sustituto,
            primer_apellido_tutor_sustituto: data.primer_apellido_tutor_sustituto,
            segundo_apellido_tutor_sustituto: data.segundo_apellido_tutor_sustituto,
            nombre_curador: data.nombre_curador,
            primer_apellido_curador: data.primer_apellido_curador,
            segundo_apellido_curador: data.segundo_apellido_curador,
            nombre_a_su_falta_curador: data.nombre_a_su_falta_curador,
            primer_apellido_a_su_falta_curador: data.primer_apellido_a_su_falta_curador,
            segundo_apellido_a_su_falta_curador: data.segundo_apellido_a_su_falta_curador
        });
    }
    const buildIndexedPath = (field, index) => {
        var _a;
        const fullFieldName = `testigos[${index}][${field}]`;
        const file = (_a = files[fullFieldName]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? path_1.default.join('storage', data.f_curp, file.filename) : null;
    };
    try {
        if (data.testigos) {
            for (let i = 0; i < data.testigos.length; i++) {
                const itemtest = data.testigos[i];
                const testig = yield testigos_1.default.create({
                    solicitudId: solicitud.id,
                    nombre_testigo: itemtest.nombre_testigo,
                    primer_apellido_testigo: itemtest.primer_apellido_testigo,
                    segundo_apellido_testigo: itemtest.segundo_apellido_testigo,
                    nacionalidad: itemtest.nacionalidad_testigo,
                    fecha_naciento: itemtest.fecha_nacimiento_testigo,
                    lugar_nacimiento: itemtest.lugar_nacimiento_testigo,
                    curp_dato: itemtest.curp_testigo,
                    estado_civil: itemtest.estado_civil_testigo,
                    ocupacion: itemtest.ocupacion_testigo,
                    domicilio: itemtest.domicilio_testigo,
                    cp: itemtest.cp_testigo,
                    telefono: itemtest.telefono_testigo,
                    rfc: itemtest.rfc_testigo,
                    identificacion: buildIndexedPath('identificacion_t', i),
                    curp: buildIndexedPath('curp_t', i),
                    comprobante_domicilio: buildIndexedPath('comprobante_domicilio_t', i)
                });
            }
        }
    }
    catch (error) {
        console.error('Error al crear el HEREDEROS :', error);
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
            ],
        });
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: solicitud.userId },
                });
                if (datos) {
                    solicitud.setDataValue('datos_user', datos);
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
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    try {
        const whereCondition = isUUID ? { id } : { userId: id };
        console.log(whereCondition);
        let solicitudes = yield solicitud_1.default.findAll({
            where: whereCondition,
            include: [
                {
                    model: testigos_1.default,
                    as: 'testigos',
                },
                {
                    model: albaceas_1.default,
                    as: 'albacea',
                },
                {
                    model: documentos_1.default,
                    as: 'documentos',
                    include: [
                        {
                            model: tipos_documentos_1.default,
                            as: 'tipo_doc',
                        },
                    ],
                },
                {
                    model: herederos_1.default,
                    as: 'herederos',
                },
                {
                    model: herederos_sustitutos_1.default,
                    as: 'herederos_susti',
                },
                {
                    model: hijos_2.default,
                    as: 'hijos',
                },
                // Primeras nupcias (orden 1)
                {
                    model: matrimonios_1.default,
                    as: 'primeras_nupcias',
                    where: { orden: 1 },
                    required: false,
                    include: [
                        {
                            model: hijos_2.default,
                            as: 'hijos',
                        },
                    ],
                },
                // Segundas nupcias (orden 2)
                {
                    model: matrimonios_1.default,
                    as: 'segundas_nupcias',
                    where: { orden: 2 },
                    required: false,
                    include: [
                        {
                            model: hijos_2.default,
                            as: 'hijos',
                        },
                    ],
                },
                {
                    model: padres_1.default,
                    as: 'padres',
                },
                {
                    model: testamentos_pasados_1.default,
                    as: 'testamentos_pasados',
                },
                {
                    model: tutor_descendientes_1.default,
                    as: 'tutor_descendientes',
                },
                {
                    model: hijos_2.default,
                    as: 'hijo_fuera',
                    where: { fuera_de_matrimonio: true },
                    required: false,
                }
            ],
        });
        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: solicitud.userId },
                });
                if (datos) {
                    solicitud.setDataValue('datos_user', datos);
                }
            }
        }
        const civil = yield dp_estado_civil_1.default.findAll();
        if (solicitudes) {
            // return res.json(solicitudes);
            return res.json({
                solicitud: solicitudes,
                estadocivil: civil
            });
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
const getsolicitudesapi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let solicitudes = yield solicitud_1.default.findAll({
            include: [
                {
                    model: testigos_1.default,
                    as: 'testigos',
                },
                {
                    model: albaceas_1.default,
                    as: 'albacea',
                },
                {
                    model: documentos_1.default,
                    as: 'documentos',
                    include: [
                        {
                            model: tipos_documentos_1.default,
                            as: 'tipo_doc',
                        },
                    ],
                },
                {
                    model: herederos_1.default,
                    as: 'herederos',
                },
                {
                    model: herederos_sustitutos_1.default,
                    as: 'herederos_susti',
                },
                {
                    model: hijos_2.default,
                    as: 'hijos',
                },
                // Primeras nupcias (orden 1)
                {
                    model: matrimonios_1.default,
                    as: 'primeras_nupcias',
                    where: { orden: 1 },
                    required: false,
                    include: [
                        {
                            model: hijos_2.default,
                            as: 'hijos',
                        },
                    ],
                },
                // Segundas nupcias (orden 2)
                {
                    model: matrimonios_1.default,
                    as: 'segundas_nupcias',
                    where: { orden: 2 },
                    required: false,
                    include: [
                        {
                            model: hijos_2.default,
                            as: 'hijos',
                        },
                    ],
                },
                {
                    model: padres_1.default,
                    as: 'padres',
                },
                {
                    model: testamentos_pasados_1.default,
                    as: 'testamentos_pasados',
                },
                {
                    model: tutor_descendientes_1.default,
                    as: 'tutor_descendientes',
                },
                {
                    model: hijos_2.default,
                    as: 'hijo_fuera',
                    where: { fuera_de_matrimonio: true },
                    required: false,
                }
            ],
        });
        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: solicitud.userId },
                });
                if (datos) {
                    solicitud.setDataValue('datos_user', datos);
                }
            }
        }
        if (solicitudes) {
            // return res.json(solicitudes);
            return res.json({
                solicitudes: solicitudes,
            });
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
exports.getsolicitudesapi = getsolicitudesapi;
////////////////////////////////////////////////// CODIGO NUEVO ///////////////////////////////////////////////////////////////////////////////
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return bcrypt_1.default.hash(password, 10); });
const buildPath = (files, field, curp) => {
    var _a;
    const file = (_a = files[field]) === null || _a === void 0 ? void 0 : _a[0];
    return file ? path_1.default.join('storage', curp, file.filename) : null;
};
const saveprogreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const data = req.body;
    const files = req.files;
    const f_curp = data.f_curp;
    const UpasswordHash = yield hashPassword(data.f_rfc);
    const cleanEmptyStrings = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v]));
    const upsert = (model, where, values) => __awaiter(void 0, void 0, void 0, function* () {
        const record = yield model.findOne({ where });
        return record ? yield record.update(values) : yield model.create(values);
    });
    // 1. Datos Personales
    yield upsert(dp_datospersonales_1.dp_datospersonales, { f_curp }, {
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
        estadocivil_id: data.estado_civil,
    });
    // 2. Solicitud
    const cleanedData = cleanEmptyStrings({
        userId: data.f_rfc,
        es_primer_testamento: data.primer_testamento,
        sabe_leer: data.sabe_leer,
        sabe_escribir: data.sabe_escribir,
        puede_hablar: data.puede_hablar,
        puede_ver: data.puede_ver,
        puede_oir: data.puede_oir,
        heredero_menor_edad: data.menor_de_edad,
        documento_identifica: data.documento_identifica,
        numero_documento_identifica: data.numero_documento_identifica,
        nacionalidad: data.nacionalidad_serv,
        indique_nacionalidad_serv: data.indique_nacionalidad_serv,
        documento_residencia: data.documento_residencia_serv,
        dificultad_comunicacion: data.presenta_dificultad,
    });
    let solicitud = yield solicitud_1.default.findOne({ where: { userId: data.f_rfc } });
    if (!solicitud) {
        solicitud = yield solicitud_1.default.create(cleanedData);
    }
    else {
        yield solicitud.update(cleanedData);
    }
    // 3. Documentos
    const documentosFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
        'ine', 'comprobante_residencia', 'constancia_situacion_fiscal'
    ];
    for (const field of documentosFields) {
        const filePath = buildPath(files, field, f_curp);
        if (!filePath)
            continue;
        const tipoDoc = yield tipos_documentos_1.default.findOne({ where: { tipo: field } });
        if (!tipoDoc)
            continue;
        const existing = yield documentos_1.default.findOne({ where: { solicitudId: solicitud.id, tipo_documento: tipoDoc.id } });
        if (existing) {
            yield existing.update({ archivo_path: filePath });
        }
        else {
            yield documentos_1.default.create({ solicitudId: solicitud.id, tipo_documento: tipoDoc.id, archivo_path: filePath });
        }
    }
    // 4. Padres
    try {
        const upsertPadre = (tipo, rawDataPadre) => __awaiter(void 0, void 0, void 0, function* () {
            const dataPadre = cleanEmptyStrings(rawDataPadre);
            // Verifica si al menos un campo tiene un valor útil
            const tieneDatos = Object.values(dataPadre).some((valor) => valor !== null && valor !== undefined);
            if (!tieneDatos)
                return; // Nada que guardar
            const where = { solicitudId: solicitud.id, tipo };
            yield upsert(padres_1.default, where, Object.assign(Object.assign({}, dataPadre), { solicitudId: solicitud.id, tipo: tipo.toString() }));
        });
        yield upsertPadre(1, {
            nombre: data.f_nombre_padre,
            primer_apellido: data.f_primer_apellido_padre,
            segundo_apellido: data.f_segundo_apellido_padre,
            vive: data.vive_padre,
            nacionalidad: data.nacionalidad_padre,
            especifique_nacionalidad: data.especifique_nac_padre
        });
        yield upsertPadre(2, {
            nombre: data.f_nombre_madre,
            primer_apellido: data.f_primer_apellido_madre,
            segundo_apellido: data.f_segundo_apellido_pmadre,
            vive: data.vive_madre,
            nacionalidad: data.nacionalidad_madre,
            especifique_nacionalidad: data.especifique_nac_madre
        });
    }
    catch (error) {
        console.error('Error al crear los HEREDEROS:', error);
    }
    const upsertMatrimonio = (orden, rawDatos) => __awaiter(void 0, void 0, void 0, function* () {
        // Limpia strings vacíos
        const datos = cleanEmptyStrings(rawDatos);
        // Verifica si hay al menos un dato no nulo
        const tieneDatos = Object.values(datos).some((valor) => valor !== null && valor !== undefined);
        if (!tieneDatos)
            return null; // No guardar si todos los campos están vacíos
        const where = { solicitudId: solicitud.id, orden };
        const valores = {
            solicitudId: solicitud.id,
            orden,
            nombre: datos.nombre,
            primer_apellido: datos.primer_apellido,
            segundo_apellido: datos.segundo_apellido,
            regimen_patrimonial: datos.regimen_patrimonial,
            vive: datos.vive,
        };
        const matrimonio = yield matrimonios_1.default.findOne({ where });
        return matrimonio
            ? yield matrimonio.update(valores)
            : yield matrimonios_1.default.create(valores);
    });
    const registrarHijosPorMatrimonio = (matrimonioId, hijos) => __awaiter(void 0, void 0, void 0, function* () {
        yield hijos_1.default.destroy({ where: { matrimonioId } });
        for (const hijoRaw of hijos) {
            const hijo = cleanEmptyStrings(hijoRaw);
            yield hijos_1.default.create({
                solicitudId: solicitud.id,
                matrimonioId,
                nombre: hijo.nombre,
                primer_apellido: hijo.primer_apellido,
                segundo_apellido: hijo.segundo_apellido,
                edad: hijo.edad,
                vive: hijo.vive,
                reconocido: true,
                fuera_de_matrimonio: false,
            });
        }
    });
    // Función para registrar hijos fuera del matrimonio
    const registrarHijosFueraMatrimonio = (hijos) => __awaiter(void 0, void 0, void 0, function* () {
        yield hijos_1.default.destroy({ where: { solicitudId: solicitud.id, fuera_de_matrimonio: true } });
        for (const hijoRaw of hijos) {
            const hijo = cleanEmptyStrings(hijoRaw);
            const tieneDatos = Object.values(hijo).some((v) => v !== null && v !== undefined);
            if (!tieneDatos)
                continue;
            yield hijos_1.default.create({
                solicitudId: solicitud.id,
                nombre: hijo.nombre,
                primer_apellido: hijo.primer_apellido,
                segundo_apellido: hijo.segundo_apellido,
                edad: hijo.edad,
                vive: hijo.vive,
                reconocido: false,
                fuera_de_matrimonio: true,
                nombre_fuera: data.nombre_fuera_matri || null,
                primer_apellido_fuera_matri: data.primer_apellido_fuera_matri || null,
                segundo_apellido_fuera_matri: data.segundo_apellido_fuera_matri || null,
            });
        }
    });
    // === MATRIMONIO 1 ===
    const matrimonio1 = yield upsertMatrimonio(1, {
        nombre: data.nombre_primer_nup,
        primer_apellido: data.primer_apellido_primer_nup,
        segundo_apellido: data.segundo_apellido_primer_nup,
        regimen_patrimonial: data.regimen_patrimonial_primer_nup,
        vive: data.vive_primer_nup,
    });
    if (matrimonio1 && Array.isArray(data.hijosPrimerMatrimonio)) {
        const hijos1 = data.hijosPrimerMatrimonio.map((h) => ({
            nombre: h.hijo_nombre_primer_nup,
            primer_apellido: h.hijo_primer_apellido_primer_nup,
            segundo_apellido: h.hijo_segundo_apellido_primer_nup,
            edad: h.hijo_edad_primer_nup,
            vive: h.hijo_vf_primer_nup,
        }));
        yield registrarHijosPorMatrimonio(matrimonio1.id, hijos1);
    }
    // === MATRIMONIO 2 ===
    const matrimonio2 = yield upsertMatrimonio(2, {
        nombre: data.nombre_dos_nup,
        primer_apellido: data.primer_apellido_dos_nup,
        segundo_apellido: data.segundo_apellido_dos_nup,
        regimen_patrimonial: data.regimen_patrimonial_dos_nup,
        vive: data.vive_dos_nup,
    });
    if (matrimonio2 && Array.isArray(data.hijosSegundoMatrimonio)) {
        const hijos2 = data.hijosSegundoMatrimonio.map((h) => ({
            nombre: h.hijo_nombre_dos_nup,
            primer_apellido: h.hijo_primer_apellido_dos_nup,
            segundo_apellido: h.hijo_segundo_apellido_dos_nup,
            edad: h.hijo_edad_dos_nup,
            vive: h.hijo_vf_dos_nup,
        }));
        yield registrarHijosPorMatrimonio(matrimonio2.id, hijos2);
    }
    // === HIJOS FUERA DE MATRIMONIO ===
    if (Array.isArray(data.hijosFueraMatrimonio)) {
        const hijosFuera = data.hijosFueraMatrimonio.map((h) => ({
            nombre: h.fuera_hijo_nombre,
            primer_apellido: h.fuera_hijo_primer_apellido,
            segundo_apellido: h.fuera_hijo_segundo_apellido,
            edad: h.fuera_hijo_edad,
            vive: h.fuera_hijo_vf,
        }));
        yield registrarHijosFueraMatrimonio(hijosFuera);
    }
    if (data.primer_testamento == 0) {
        const datosParciales = {
            fecha_tramite: data.fecha_primer_testamento,
            notaria: data.notaria_primer_testamento,
            instrumento_volumen: data.instrumento_primer_testamento,
            path_testamento: buildPath(files, 'primer_testamento_doc', f_curp),
        };
        const camposLimpiados = cleanEmptyStrings(datosParciales);
        // Verifica si al menos un campo útil viene
        const tieneDatos = Object.values(camposLimpiados).some((valor) => valor !== null && valor !== undefined);
        if (tieneDatos) {
            const valores = Object.assign(Object.assign({}, camposLimpiados), { solicitudId: solicitud.id });
            let testamentoExistente = yield testamentos_pasados_1.default.findOne({
                where: { solicitudId: solicitud.id },
            });
            if (testamentoExistente) {
                yield testamentoExistente.update(valores);
            }
            else {
                yield testamentos_pasados_1.default.create(valores);
            }
        }
    }
    function cleanEmptyStrings2(obj) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v]));
    }
    try {
        if (data.herederos && Array.isArray(data.herederos)) {
            yield herederos_1.default.destroy({ where: { solicitudId: solicitud.id } });
            for (const herederoRaw of data.herederos) {
                const herederoLimpio = cleanEmptyStrings2({
                    nombre_heredero: herederoRaw.nombre_heredero,
                    primer_apellido_heredero: herederoRaw.primer_apellido_heredero,
                    segundo_apellido_heredero: herederoRaw.segundo_apellido_heredero,
                    porcentaje: herederoRaw.porcentaje_heredero,
                    edad: herederoRaw.edad_heredero,
                    parentesco: herederoRaw.parentesco_heredero,
                });
                // Valida si al menos uno de los campos tiene valor
                const tieneDatos = Object.values(herederoLimpio).some((v) => v !== null && v !== undefined);
                if (!tieneDatos)
                    continue;
                yield herederos_1.default.create(Object.assign(Object.assign({}, herederoLimpio), { solicitudId: solicitud.id, derecho_acrecer: (_a = data.derecho_acrecer) !== null && _a !== void 0 ? _a : null }));
            }
        }
    }
    catch (error) {
        console.error('Error al crear los HEREDEROS:', error);
    }
    try {
        if (data.herederoSustituto) {
            yield herederos_sustitutos_1.default.destroy({
                where: { solicitudId: solicitud.id }
            });
            for (const herederosustituto of data.herederoSustituto) {
                // Normalizar campos
                const nombre = ((_b = herederosustituto.nombre_sustituto) === null || _b === void 0 ? void 0 : _b.trim()) || null;
                const apellido1 = ((_c = herederosustituto.primer_apellido_sustituto) === null || _c === void 0 ? void 0 : _c.trim()) || null;
                const apellido2 = ((_d = herederosustituto.segundo_apellido_sustituto) === null || _d === void 0 ? void 0 : _d.trim()) || null;
                const sustituidoNombre = ((_e = herederosustituto.nombre_a_sustituir) === null || _e === void 0 ? void 0 : _e.trim()) || null;
                const sustituidoApellido1 = ((_f = herederosustituto.primer_apellido_a_sustituir) === null || _f === void 0 ? void 0 : _f.trim()) || null;
                const sustituidoApellido2 = ((_g = herederosustituto.segundo_apellido_a_sustituir) === null || _g === void 0 ? void 0 : _g.trim()) || null;
                const derecho = ((_h = data.derecho_acrecer_sustituto) === null || _h === void 0 ? void 0 : _h.toString().trim()) || null;
                // Validar que haya al menos un dato
                const tieneDatos = nombre ||
                    apellido1 ||
                    apellido2 ||
                    sustituidoNombre ||
                    sustituidoApellido1 ||
                    sustituidoApellido2;
                if (tieneDatos) {
                    yield herederos_sustitutos_1.default.create({
                        solicitudId: solicitud.id,
                        nombre_sustituto: nombre,
                        primer_apellido_sustituto: apellido1,
                        segundo_apellido_sustituto: apellido2,
                        nombre_a_sustituir: sustituidoNombre,
                        primer_apellido_a_sustituir: sustituidoApellido1,
                        segundo_apellido_a_sustituir: sustituidoApellido2,
                        derecho_acrecer: derecho
                    });
                }
            }
        }
    }
    catch (error) {
        console.error('Error al crear los HEREDEROS SUSTITUTOS:', error);
    }
    try {
        const datosCrudos = {
            nombre_albacea: data.nombre_albacea,
            primer_apellido_albacea: data.primer_apellido_albacea,
            segundo_apellido_albacea: data.segundo_apellido_albacea,
            nombre_falta_albacea: data.nombre_falta_albacea,
            primer_apellido_falta_albacea: data.primer_apellido_falta_albacea,
            segundo_apellido_falta_albacea: data.segundo_apellido_falta_albacea,
        };
        const datosLimpios = cleanEmptyStrings(datosCrudos);
        const tieneDatos = Object.values(datosLimpios).some((v) => v !== null && v !== undefined);
        if (!tieneDatos) {
            console.warn('No hay datos válidos para guardar ALBACEA.');
        }
        else {
            const datosAlbacea = Object.assign(Object.assign({}, datosLimpios), { solicitudId: solicitud.id });
            const albaceaExistente = yield albaceas_1.default.findOne({
                where: { solicitudId: solicitud.id },
            });
            if (albaceaExistente) {
                yield albaceaExistente.update(datosAlbacea);
            }
            else {
                yield albaceas_1.default.create(datosAlbacea);
            }
        }
    }
    catch (error) {
        console.error('Error al guardar el ALBACEA:', error);
    }
    try {
        if (data.menor_de_edad == 1) {
            const rawValoresTutor = {
                nombre_tutor: data.nombre_tutor,
                primer_apellido_tutor: data.primer_apellido_tutor,
                segundo_apellido_tutor: data.segundo_apellido_tutor,
                nombre_tutor_sustituto: data.nombre_tutor_sustituto,
                primer_apellido_tutor_sustituto: data.primer_apellido_tutor_sustituto,
                segundo_apellido_tutor_sustituto: data.segundo_apellido_tutor_sustituto,
                nombre_curador: data.nombre_curador,
                primer_apellido_curador: data.primer_apellido_curador,
                segundo_apellido_curador: data.segundo_apellido_curador,
                nombre_a_su_falta_curador: data.nombre_a_su_falta_curador,
                primer_apellido_a_su_falta_curador: data.primer_apellido_a_su_falta_curador,
                segundo_apellido_a_su_falta_curador: data.segundo_apellido_a_su_falta_curador,
            };
            const cleaned = cleanEmptyStrings(rawValoresTutor);
            const tieneDatos = Object.values(cleaned).some((v) => v !== null && v !== undefined);
            if (!tieneDatos) {
                console.warn('No hay datos válidos para guardar TUTOR.');
            }
            else {
                const valoresTutor = Object.assign({ solicitudId: solicitud.id }, cleaned);
                const tutorExistente = yield tutor_descendientes_1.default.findOne({
                    where: { solicitudId: solicitud.id }
                });
                if (tutorExistente) {
                    yield tutorExistente.update(valoresTutor);
                }
                else {
                    yield tutor_descendientes_1.default.create(valoresTutor);
                }
            }
        }
    }
    catch (error) {
        console.error('Error al guardar el TUTOR del descendiente menor de edad:', error);
    }
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1", data);
    const buildIndexedPath = (field, index) => {
        var _a;
        const fullFieldName = `testigos[${index}][${field}]`;
        const file = (_a = files[fullFieldName]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? path_1.default.join('storage', data.f_curp, file.filename) : undefined;
    };
    const normalizeValues = (obj) => {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = typeof value === 'string' && value.trim() === '' ? undefined : value;
        }
        return result;
    };
    // Verifica si al menos un campo del objeto tiene un valor no nulo y no vacío
    const hasMeaningfulData = (obj) => Object.values(obj).some(val => typeof val === 'string' ? val.trim() !== '' : val !== null && val !== undefined);
    try {
        if (data.testigos) {
            console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2", data);
            const testigosAnteriores = yield testigos_1.default.findAll({
                where: { solicitudId: solicitud.id },
                order: [['id', 'ASC']]
            });
            yield testigos_1.default.destroy({
                where: { solicitudId: solicitud.id }
            });
            for (let i = 0; i < data.testigos.length; i++) {
                const itemtest = data.testigos[i];
                const anterior = testigosAnteriores[i];
                const getPath = (field, anteriorPath) => {
                    const nuevoPath = buildIndexedPath(field, i);
                    if (typeof nuevoPath === 'string' && nuevoPath.trim() !== '') {
                        return nuevoPath;
                    }
                    return anteriorPath !== null && anteriorPath !== void 0 ? anteriorPath : undefined;
                };
                const datosTestigo = normalizeValues({
                    solicitudId: solicitud.id,
                    nombre_testigo: itemtest.nombre_testigo,
                    primer_apellido_testigo: itemtest.primer_apellido_testigo,
                    segundo_apellido_testigo: itemtest.segundo_apellido_testigo,
                    nacionalidad: itemtest.nacionalidad_testigo,
                    fecha_naciento: itemtest.fecha_nacimiento_testigo,
                    lugar_nacimiento: itemtest.lugar_nacimiento_testigo,
                    curp_dato: itemtest.curp_testigo,
                    estado_civil: itemtest.estado_civil_testigo,
                    ocupacion: itemtest.ocupacion_testigo,
                    domicilio: itemtest.domicilio_testigo,
                    cp: itemtest.cp_testigo,
                    telefono: itemtest.telefono_testigo,
                    rfc: itemtest.rfc_testigo,
                    identificacion: getPath('identificacion_t', (_j = anterior === null || anterior === void 0 ? void 0 : anterior.identificacion) !== null && _j !== void 0 ? _j : undefined),
                    curp: getPath('curp_t', (_k = anterior === null || anterior === void 0 ? void 0 : anterior.curp) !== null && _k !== void 0 ? _k : undefined),
                    comprobante_domicilio: getPath('comprobante_domicilio_t', (_l = anterior === null || anterior === void 0 ? void 0 : anterior.comprobante_domicilio) !== null && _l !== void 0 ? _l : undefined),
                });
                // Solo crea si hay al menos un dato relevante
                if (hasMeaningfulData(datosTestigo)) {
                    yield testigos_1.default.create(datosTestigo);
                }
            }
        }
    }
    catch (error) {
        console.error('Error al crear los TESTIGOS:', error);
    }
    return 500;
    return res.status(200).json({ message: 'Progreso guardado correctamente' });
});
exports.saveprogreso = saveprogreso;
