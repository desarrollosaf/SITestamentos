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
            //indique_nacionalidad_serv: data.indique_nacionalidad_serv,
            //documento_residencia: data.documento_residencia_serv,
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
                nombre_fuera: ''
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
        if (data.hijosSegundo) {
            for (const hijossegundos of data.hijosSegundo) {
                const hijossegundasnupcias = yield hijos_1.default.create({
                    solicitudId: solicitud.id,
                    matrimonioId: segundasnupcias.id,
                    nombre: hijossegundos.hijo_nombre_primer_nup,
                    primer_apellido: hijossegundos.hijo_primer_apellido_primer_nup,
                    segundo_apellido: hijossegundos.hijo_segundo_apellido_primer_nup,
                    edad: hijossegundos.hijo_edad_dos_nup,
                    vive: hijossegundos.hijo_vf_dos_nup,
                    reconocido: true,
                    fuera_de_matrimonio: false,
                    nombre_fuera: ''
                });
            }
        }
    }
    if (data.hijosFueraMatrim) {
        for (const hijosfuera of data.hijosFueraMatrim) {
            const hijosfueramatrimonio = yield hijos_1.default.create({
                solicitudId: solicitud.id,
                matrimonioId: '',
                nombre: hijosfuera.fuera_hijo_nombre,
                primer_apellido: hijosfuera.fuera_hijo_primer_apellido,
                segundo_apellido: hijosfuera.fuera_hijo_segundo_apellido,
                edad: hijosfuera.fuera_hijo_edad,
                vive: hijosfuera.fuera_hijo_vf,
                reconocido: false,
                fuera_de_matrimonio: true,
                nombre_fuera: data.nombre_fuera
            });
        }
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
            primer_apellido_tutor: data.nombre_tutor,
            segundo_apellido_tutor: data.segundo_apellido_tutor,
            nombre_tutor_sustituto: data.nombre_tutor_sustituto,
            primer_apellido_tutor_sustituto: data.nombre_tutor_sustituto,
            segundo_apellido_tutor_sustituto: data.nombre_tutor_sustituto,
            nombre_curador: data.nombre_curador,
            primer_apellido_curador: data.nombre_curador,
            segundo_apellido_curador: data.nombre_curador,
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
        console.error('❌ Error al crear el HEREDEROS :', error);
    }
    return 500;
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
                console.log('📌 Buscando datos personales para:', solicitud.userId);
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
    try {
        let solicitudes = yield solicitud_1.default.findAll({
            where: { id: id },
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
                console.log('📌 Buscando datos personales para:', solicitud.userId);
                const datos = yield dp_datospersonales_1.dp_datospersonales.findOne({
                    where: { f_rfc: solicitud.userId },
                });
                if (datos) {
                    solicitud.setDataValue('datos_user', datos);
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
