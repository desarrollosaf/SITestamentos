"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_solicitud_verificacion = exports.pre_solicitud_facturas = exports.pre_proyectos_partidas = exports.pre_proyectos = exports.pre_proyecto_unidades = exports.pre_programatico_presupuestals = exports.pre_programas = exports.pre_partidas = exports.pre_metas_unidads = exports.pre_fuente_financiamientos = exports.pre_folios = exports.pre_files = exports.pre_estatuses = exports.pre_cat_verificacion_solicituds = exports.pre_capitulos = exports.pre_adjuntos = exports.personal_access_tokens = exports.permissions = exports.per_tipo_suspencions = exports.per_tipo_permisos = exports.per_registro_permisos = exports.per_registro_facials = exports.per_periodo_licencias = exports.per_opciones_estados = exports.per_calentarios = exports.password_reset_tokens = exports.model_has_roles = exports.model_has_permissions = exports.migrations = exports.fum_datos_generales = exports.failed_jobs = exports.dp_paises = exports.dp_opciones = exports.dp_municipios = exports.dp_hijos = exports.dp_fum_datos_generales = exports.dp_estados = exports.dp_estado_civil = exports.dp_escolaridad = exports.dp_documento_obtenido = exports.dp_datospersonales = exports.dp_colonias = exports.dp_beneficiarios = exports.con_tipo_contratos = exports.con_proveedores = exports.con_plazos = exports.con_opciones = exports.con_contratos = exports.car_tipo_movimientos_personals = exports.car_adeudo_temporals = void 0;
exports.users = exports.roles = exports.role_has_permissions = exports.pre_sub_verificacion_solicituds = exports.pre_sub_partidas = exports.pre_solicituds = void 0;
exports.initModels = initModels;
const car_adeudo_temporals_1 = require("./car_adeudo_temporals");
Object.defineProperty(exports, "car_adeudo_temporals", { enumerable: true, get: function () { return car_adeudo_temporals_1.car_adeudo_temporals; } });
const car_tipo_movimientos_personals_1 = require("./car_tipo_movimientos_personals");
Object.defineProperty(exports, "car_tipo_movimientos_personals", { enumerable: true, get: function () { return car_tipo_movimientos_personals_1.car_tipo_movimientos_personals; } });
const con_contratos_1 = require("./con_contratos");
Object.defineProperty(exports, "con_contratos", { enumerable: true, get: function () { return con_contratos_1.con_contratos; } });
const con_opciones_1 = require("./con_opciones");
Object.defineProperty(exports, "con_opciones", { enumerable: true, get: function () { return con_opciones_1.con_opciones; } });
const con_plazos_1 = require("./con_plazos");
Object.defineProperty(exports, "con_plazos", { enumerable: true, get: function () { return con_plazos_1.con_plazos; } });
const con_proveedores_1 = require("./con_proveedores");
Object.defineProperty(exports, "con_proveedores", { enumerable: true, get: function () { return con_proveedores_1.con_proveedores; } });
const con_tipo_contratos_1 = require("./con_tipo_contratos");
Object.defineProperty(exports, "con_tipo_contratos", { enumerable: true, get: function () { return con_tipo_contratos_1.con_tipo_contratos; } });
const dp_beneficiarios_1 = require("./dp_beneficiarios");
Object.defineProperty(exports, "dp_beneficiarios", { enumerable: true, get: function () { return dp_beneficiarios_1.dp_beneficiarios; } });
const dp_colonias_1 = require("./dp_colonias");
Object.defineProperty(exports, "dp_colonias", { enumerable: true, get: function () { return dp_colonias_1.dp_colonias; } });
const dp_datospersonales_1 = require("./dp_datospersonales");
Object.defineProperty(exports, "dp_datospersonales", { enumerable: true, get: function () { return dp_datospersonales_1.dp_datospersonales; } });
const dp_documento_obtenido_1 = require("./dp_documento_obtenido");
Object.defineProperty(exports, "dp_documento_obtenido", { enumerable: true, get: function () { return dp_documento_obtenido_1.dp_documento_obtenido; } });
const dp_escolaridad_1 = require("./dp_escolaridad");
Object.defineProperty(exports, "dp_escolaridad", { enumerable: true, get: function () { return dp_escolaridad_1.dp_escolaridad; } });
const dp_estado_civil_1 = require("./dp_estado_civil");
Object.defineProperty(exports, "dp_estado_civil", { enumerable: true, get: function () { return dp_estado_civil_1.dp_estado_civil; } });
const dp_estados_1 = require("./dp_estados");
Object.defineProperty(exports, "dp_estados", { enumerable: true, get: function () { return dp_estados_1.dp_estados; } });
const dp_fum_datos_generales_1 = require("./dp_fum_datos_generales");
Object.defineProperty(exports, "dp_fum_datos_generales", { enumerable: true, get: function () { return dp_fum_datos_generales_1.dp_fum_datos_generales; } });
const dp_hijos_1 = require("./dp_hijos");
Object.defineProperty(exports, "dp_hijos", { enumerable: true, get: function () { return dp_hijos_1.dp_hijos; } });
const dp_municipios_1 = require("./dp_municipios");
Object.defineProperty(exports, "dp_municipios", { enumerable: true, get: function () { return dp_municipios_1.dp_municipios; } });
const dp_opciones_1 = require("./dp_opciones");
Object.defineProperty(exports, "dp_opciones", { enumerable: true, get: function () { return dp_opciones_1.dp_opciones; } });
const dp_paises_1 = require("./dp_paises");
Object.defineProperty(exports, "dp_paises", { enumerable: true, get: function () { return dp_paises_1.dp_paises; } });
const failed_jobs_1 = require("./failed_jobs");
Object.defineProperty(exports, "failed_jobs", { enumerable: true, get: function () { return failed_jobs_1.failed_jobs; } });
const fum_datos_generales_1 = require("./fum_datos_generales");
Object.defineProperty(exports, "fum_datos_generales", { enumerable: true, get: function () { return fum_datos_generales_1.fum_datos_generales; } });
const migrations_1 = require("./migrations");
Object.defineProperty(exports, "migrations", { enumerable: true, get: function () { return migrations_1.migrations; } });
const model_has_permissions_1 = require("./model_has_permissions");
Object.defineProperty(exports, "model_has_permissions", { enumerable: true, get: function () { return model_has_permissions_1.model_has_permissions; } });
const model_has_roles_1 = require("./model_has_roles");
Object.defineProperty(exports, "model_has_roles", { enumerable: true, get: function () { return model_has_roles_1.model_has_roles; } });
const password_reset_tokens_1 = require("./password_reset_tokens");
Object.defineProperty(exports, "password_reset_tokens", { enumerable: true, get: function () { return password_reset_tokens_1.password_reset_tokens; } });
const per_calentarios_1 = require("./per_calentarios");
Object.defineProperty(exports, "per_calentarios", { enumerable: true, get: function () { return per_calentarios_1.per_calentarios; } });
const per_opciones_estados_1 = require("./per_opciones_estados");
Object.defineProperty(exports, "per_opciones_estados", { enumerable: true, get: function () { return per_opciones_estados_1.per_opciones_estados; } });
const per_periodo_licencias_1 = require("./per_periodo_licencias");
Object.defineProperty(exports, "per_periodo_licencias", { enumerable: true, get: function () { return per_periodo_licencias_1.per_periodo_licencias; } });
const per_registro_facials_1 = require("./per_registro_facials");
Object.defineProperty(exports, "per_registro_facials", { enumerable: true, get: function () { return per_registro_facials_1.per_registro_facials; } });
const per_registro_permisos_1 = require("./per_registro_permisos");
Object.defineProperty(exports, "per_registro_permisos", { enumerable: true, get: function () { return per_registro_permisos_1.per_registro_permisos; } });
const per_tipo_permisos_1 = require("./per_tipo_permisos");
Object.defineProperty(exports, "per_tipo_permisos", { enumerable: true, get: function () { return per_tipo_permisos_1.per_tipo_permisos; } });
const per_tipo_suspencions_1 = require("./per_tipo_suspencions");
Object.defineProperty(exports, "per_tipo_suspencions", { enumerable: true, get: function () { return per_tipo_suspencions_1.per_tipo_suspencions; } });
const permissions_1 = require("./permissions");
Object.defineProperty(exports, "permissions", { enumerable: true, get: function () { return permissions_1.permissions; } });
const personal_access_tokens_1 = require("./personal_access_tokens");
Object.defineProperty(exports, "personal_access_tokens", { enumerable: true, get: function () { return personal_access_tokens_1.personal_access_tokens; } });
const pre_adjuntos_1 = require("./pre_adjuntos");
Object.defineProperty(exports, "pre_adjuntos", { enumerable: true, get: function () { return pre_adjuntos_1.pre_adjuntos; } });
const pre_capitulos_1 = require("./pre_capitulos");
Object.defineProperty(exports, "pre_capitulos", { enumerable: true, get: function () { return pre_capitulos_1.pre_capitulos; } });
const pre_cat_verificacion_solicituds_1 = require("./pre_cat_verificacion_solicituds");
Object.defineProperty(exports, "pre_cat_verificacion_solicituds", { enumerable: true, get: function () { return pre_cat_verificacion_solicituds_1.pre_cat_verificacion_solicituds; } });
const pre_estatuses_1 = require("./pre_estatuses");
Object.defineProperty(exports, "pre_estatuses", { enumerable: true, get: function () { return pre_estatuses_1.pre_estatuses; } });
const pre_files_1 = require("./pre_files");
Object.defineProperty(exports, "pre_files", { enumerable: true, get: function () { return pre_files_1.pre_files; } });
const pre_folios_1 = require("./pre_folios");
Object.defineProperty(exports, "pre_folios", { enumerable: true, get: function () { return pre_folios_1.pre_folios; } });
const pre_fuente_financiamientos_1 = require("./pre_fuente_financiamientos");
Object.defineProperty(exports, "pre_fuente_financiamientos", { enumerable: true, get: function () { return pre_fuente_financiamientos_1.pre_fuente_financiamientos; } });
const pre_metas_unidads_1 = require("./pre_metas_unidads");
Object.defineProperty(exports, "pre_metas_unidads", { enumerable: true, get: function () { return pre_metas_unidads_1.pre_metas_unidads; } });
const pre_partidas_1 = require("./pre_partidas");
Object.defineProperty(exports, "pre_partidas", { enumerable: true, get: function () { return pre_partidas_1.pre_partidas; } });
const pre_programas_1 = require("./pre_programas");
Object.defineProperty(exports, "pre_programas", { enumerable: true, get: function () { return pre_programas_1.pre_programas; } });
const pre_programatico_presupuestals_1 = require("./pre_programatico_presupuestals");
Object.defineProperty(exports, "pre_programatico_presupuestals", { enumerable: true, get: function () { return pre_programatico_presupuestals_1.pre_programatico_presupuestals; } });
const pre_proyecto_unidades_1 = require("./pre_proyecto_unidades");
Object.defineProperty(exports, "pre_proyecto_unidades", { enumerable: true, get: function () { return pre_proyecto_unidades_1.pre_proyecto_unidades; } });
const pre_proyectos_1 = require("./pre_proyectos");
Object.defineProperty(exports, "pre_proyectos", { enumerable: true, get: function () { return pre_proyectos_1.pre_proyectos; } });
const pre_proyectos_partidas_1 = require("./pre_proyectos_partidas");
Object.defineProperty(exports, "pre_proyectos_partidas", { enumerable: true, get: function () { return pre_proyectos_partidas_1.pre_proyectos_partidas; } });
const pre_solicitud_facturas_1 = require("./pre_solicitud_facturas");
Object.defineProperty(exports, "pre_solicitud_facturas", { enumerable: true, get: function () { return pre_solicitud_facturas_1.pre_solicitud_facturas; } });
const pre_solicitud_verificacion_1 = require("./pre_solicitud_verificacion");
Object.defineProperty(exports, "pre_solicitud_verificacion", { enumerable: true, get: function () { return pre_solicitud_verificacion_1.pre_solicitud_verificacion; } });
const pre_solicituds_1 = require("./pre_solicituds");
Object.defineProperty(exports, "pre_solicituds", { enumerable: true, get: function () { return pre_solicituds_1.pre_solicituds; } });
const pre_sub_partidas_1 = require("./pre_sub_partidas");
Object.defineProperty(exports, "pre_sub_partidas", { enumerable: true, get: function () { return pre_sub_partidas_1.pre_sub_partidas; } });
const pre_sub_verificacion_solicituds_1 = require("./pre_sub_verificacion_solicituds");
Object.defineProperty(exports, "pre_sub_verificacion_solicituds", { enumerable: true, get: function () { return pre_sub_verificacion_solicituds_1.pre_sub_verificacion_solicituds; } });
const role_has_permissions_1 = require("./role_has_permissions");
Object.defineProperty(exports, "role_has_permissions", { enumerable: true, get: function () { return role_has_permissions_1.role_has_permissions; } });
const roles_1 = require("./roles");
Object.defineProperty(exports, "roles", { enumerable: true, get: function () { return roles_1.roles; } });
const users_1 = require("./users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return users_1.users; } });
function initModels(sequelize) {
    const car_adeudo_temporals = car_adeudo_temporals_1.car_adeudo_temporals.initModel(sequelize);
    const car_tipo_movimientos_personals = car_tipo_movimientos_personals_1.car_tipo_movimientos_personals.initModel(sequelize);
    const con_contratos = con_contratos_1.con_contratos.initModel(sequelize);
    const con_opciones = con_opciones_1.con_opciones.initModel(sequelize);
    const con_plazos = con_plazos_1.con_plazos.initModel(sequelize);
    const con_proveedores = con_proveedores_1.con_proveedores.initModel(sequelize);
    const con_tipo_contratos = con_tipo_contratos_1.con_tipo_contratos.initModel(sequelize);
    const dp_beneficiarios = dp_beneficiarios_1.dp_beneficiarios.initModel(sequelize);
    const dp_colonias = dp_colonias_1.dp_colonias.initModel(sequelize);
    const dp_datospersonales = dp_datospersonales_1.dp_datospersonales.initModel(sequelize);
    const dp_documento_obtenido = dp_documento_obtenido_1.dp_documento_obtenido.initModel(sequelize);
    const dp_escolaridad = dp_escolaridad_1.dp_escolaridad.initModel(sequelize);
    const dp_estado_civil = dp_estado_civil_1.dp_estado_civil.initModel(sequelize);
    const dp_estados = dp_estados_1.dp_estados.initModel(sequelize);
    const dp_fum_datos_generales = dp_fum_datos_generales_1.dp_fum_datos_generales.initModel(sequelize);
    const dp_hijos = dp_hijos_1.dp_hijos.initModel(sequelize);
    const dp_municipios = dp_municipios_1.dp_municipios.initModel(sequelize);
    const dp_opciones = dp_opciones_1.dp_opciones.initModel(sequelize);
    const dp_paises = dp_paises_1.dp_paises.initModel(sequelize);
    const failed_jobs = failed_jobs_1.failed_jobs.initModel(sequelize);
    const fum_datos_generales = fum_datos_generales_1.fum_datos_generales.initModel(sequelize);
    const migrations = migrations_1.migrations.initModel(sequelize);
    const model_has_permissions = model_has_permissions_1.model_has_permissions.initModel(sequelize);
    const model_has_roles = model_has_roles_1.model_has_roles.initModel(sequelize);
    const password_reset_tokens = password_reset_tokens_1.password_reset_tokens.initModel(sequelize);
    const per_calentarios = per_calentarios_1.per_calentarios.initModel(sequelize);
    const per_opciones_estados = per_opciones_estados_1.per_opciones_estados.initModel(sequelize);
    const per_periodo_licencias = per_periodo_licencias_1.per_periodo_licencias.initModel(sequelize);
    const per_registro_facials = per_registro_facials_1.per_registro_facials.initModel(sequelize);
    const per_registro_permisos = per_registro_permisos_1.per_registro_permisos.initModel(sequelize);
    const per_tipo_permisos = per_tipo_permisos_1.per_tipo_permisos.initModel(sequelize);
    const per_tipo_suspencions = per_tipo_suspencions_1.per_tipo_suspencions.initModel(sequelize);
    const permissions = permissions_1.permissions.initModel(sequelize);
    const personal_access_tokens = personal_access_tokens_1.personal_access_tokens.initModel(sequelize);
    const pre_adjuntos = pre_adjuntos_1.pre_adjuntos.initModel(sequelize);
    const pre_capitulos = pre_capitulos_1.pre_capitulos.initModel(sequelize);
    const pre_cat_verificacion_solicituds = pre_cat_verificacion_solicituds_1.pre_cat_verificacion_solicituds.initModel(sequelize);
    const pre_estatuses = pre_estatuses_1.pre_estatuses.initModel(sequelize);
    const pre_files = pre_files_1.pre_files.initModel(sequelize);
    const pre_folios = pre_folios_1.pre_folios.initModel(sequelize);
    const pre_fuente_financiamientos = pre_fuente_financiamientos_1.pre_fuente_financiamientos.initModel(sequelize);
    const pre_metas_unidads = pre_metas_unidads_1.pre_metas_unidads.initModel(sequelize);
    const pre_partidas = pre_partidas_1.pre_partidas.initModel(sequelize);
    const pre_programas = pre_programas_1.pre_programas.initModel(sequelize);
    const pre_programatico_presupuestals = pre_programatico_presupuestals_1.pre_programatico_presupuestals.initModel(sequelize);
    const pre_proyecto_unidades = pre_proyecto_unidades_1.pre_proyecto_unidades.initModel(sequelize);
    const pre_proyectos = pre_proyectos_1.pre_proyectos.initModel(sequelize);
    const pre_proyectos_partidas = pre_proyectos_partidas_1.pre_proyectos_partidas.initModel(sequelize);
    const pre_solicitud_facturas = pre_solicitud_facturas_1.pre_solicitud_facturas.initModel(sequelize);
    const pre_solicitud_verificacion = pre_solicitud_verificacion_1.pre_solicitud_verificacion.initModel(sequelize);
    const pre_solicituds = pre_solicituds_1.pre_solicituds.initModel(sequelize);
    const pre_sub_partidas = pre_sub_partidas_1.pre_sub_partidas.initModel(sequelize);
    const pre_sub_verificacion_solicituds = pre_sub_verificacion_solicituds_1.pre_sub_verificacion_solicituds.initModel(sequelize);
    const role_has_permissions = role_has_permissions_1.role_has_permissions.initModel(sequelize);
    const roles = roles_1.roles.initModel(sequelize);
    const users = users_1.users.initModel(sequelize);
    permissions.belongsToMany(roles, { as: 'role_id_roles', through: role_has_permissions, foreignKey: "permission_id", otherKey: "role_id" });
    roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: role_has_permissions, foreignKey: "role_id", otherKey: "permission_id" });
    dp_datospersonales.belongsTo(dp_colonias, { as: "colonium", foreignKey: "colonia_id" });
    dp_colonias.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "colonia_id" });
    dp_datospersonales.belongsTo(dp_escolaridad, { as: "escolaridad", foreignKey: "escolaridad_id" });
    dp_escolaridad.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "escolaridad_id" });
    dp_datospersonales.belongsTo(dp_estado_civil, { as: "estadocivil", foreignKey: "estadocivil_id" });
    dp_estado_civil.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "estadocivil_id" });
    dp_datospersonales.belongsTo(dp_estados, { as: "estado", foreignKey: "estado_id" });
    dp_estados.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "estado_id" });
    dp_municipios.belongsTo(dp_estados, { as: "estado_dp_estado", foreignKey: "estado" });
    dp_estados.hasMany(dp_municipios, { as: "dp_municipios", foreignKey: "estado" });
    dp_colonias.belongsTo(dp_municipios, { as: "municipio_dp_municipio", foreignKey: "municipio" });
    dp_municipios.hasMany(dp_colonias, { as: "dp_colonia", foreignKey: "municipio" });
    dp_datospersonales.belongsTo(dp_municipios, { as: "municipio", foreignKey: "municipio_id" });
    dp_municipios.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "municipio_id" });
    dp_datospersonales.belongsTo(dp_opciones, { as: "sindicalizado", foreignKey: "sindicalizado_id" });
    dp_opciones.hasMany(dp_datospersonales, { as: "dp_datospersonales", foreignKey: "sindicalizado_id" });
    dp_datospersonales.belongsTo(dp_opciones, { as: "sci", foreignKey: "sci_id" });
    dp_opciones.hasMany(dp_datospersonales, { as: "sci_dp_datospersonales", foreignKey: "sci_id" });
    dp_estados.belongsTo(dp_paises, { as: "pais_dp_paise", foreignKey: "pais" });
    dp_paises.hasMany(dp_estados, { as: "dp_estados", foreignKey: "pais" });
    model_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id" });
    permissions.hasMany(model_has_permissions, { as: "model_has_permissions", foreignKey: "permission_id" });
    role_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id" });
    permissions.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "permission_id" });
    pre_solicituds.belongsTo(pre_capitulos, { as: "id_capitulo_pre_capitulo", foreignKey: "id_capitulo" });
    pre_capitulos.hasMany(pre_solicituds, { as: "pre_solicituds", foreignKey: "id_capitulo" });
    pre_solicituds.belongsTo(pre_estatuses, { as: "id_estatus_pre_estatus", foreignKey: "id_estatus" });
    pre_estatuses.hasMany(pre_solicituds, { as: "pre_solicituds", foreignKey: "id_estatus" });
    pre_proyectos.belongsTo(pre_programas, { as: "id_programas_pre_programa", foreignKey: "id_programas" });
    pre_programas.hasMany(pre_proyectos, { as: "pre_proyectos", foreignKey: "id_programas" });
    pre_solicituds.belongsTo(pre_programas, { as: "id_programa_pre_programa", foreignKey: "id_programa" });
    pre_programas.hasMany(pre_solicituds, { as: "pre_solicituds", foreignKey: "id_programa" });
    pre_solicituds.belongsTo(pre_programatico_presupuestals, { as: "id_programatico_presupuestal_pre_programatico_presupuestal", foreignKey: "id_programatico_presupuestal" });
    pre_programatico_presupuestals.hasMany(pre_solicituds, { as: "pre_solicituds", foreignKey: "id_programatico_presupuestal" });
    pre_proyecto_unidades.belongsTo(pre_proyectos, { as: "id_proyecto_pre_proyecto", foreignKey: "id_proyecto" });
    pre_proyectos.hasMany(pre_proyecto_unidades, { as: "pre_proyecto_unidades", foreignKey: "id_proyecto" });
    pre_solicituds.belongsTo(pre_proyectos, { as: "id_proyecto_pre_proyecto", foreignKey: "id_proyecto" });
    pre_proyectos.hasMany(pre_solicituds, { as: "pre_solicituds", foreignKey: "id_proyecto" });
    pre_adjuntos.belongsTo(pre_solicituds, { as: "id_solicitud_pre_solicitud", foreignKey: "id_solicitud" });
    pre_solicituds.hasMany(pre_adjuntos, { as: "pre_adjuntos", foreignKey: "id_solicitud" });
    pre_files.belongsTo(pre_solicituds, { as: "id_solicitud_pre_solicitud", foreignKey: "id_solicitud" });
    pre_solicituds.hasMany(pre_files, { as: "pre_files", foreignKey: "id_solicitud" });
    pre_solicitud_facturas.belongsTo(pre_solicituds, { as: "id_solicitud_pre_solicitud", foreignKey: "id_solicitud" });
    pre_solicituds.hasMany(pre_solicitud_facturas, { as: "pre_solicitud_facturas", foreignKey: "id_solicitud" });
    pre_solicitud_verificacion.belongsTo(pre_solicituds, { as: "id_solicitud_pre_solicitud", foreignKey: "id_solicitud" });
    pre_solicituds.hasMany(pre_solicitud_verificacion, { as: "pre_solicitud_verificacions", foreignKey: "id_solicitud" });
    pre_solicitud_facturas.belongsTo(pre_sub_partidas, { as: "id_subpartida_pre_sub_partida", foreignKey: "id_subpartida" });
    pre_sub_partidas.hasMany(pre_solicitud_facturas, { as: "pre_solicitud_facturas", foreignKey: "id_subpartida" });
    pre_solicitud_verificacion.belongsTo(pre_sub_verificacion_solicituds, { as: "id_verificacion_pre_sub_verificacion_solicitud", foreignKey: "id_verificacion" });
    pre_sub_verificacion_solicituds.hasMany(pre_solicitud_verificacion, { as: "pre_solicitud_verificacions", foreignKey: "id_verificacion" });
    model_has_roles.belongsTo(roles, { as: "role", foreignKey: "role_id" });
    roles.hasMany(model_has_roles, { as: "model_has_roles", foreignKey: "role_id" });
    role_has_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id" });
    roles.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "role_id" });
    return {
        car_adeudo_temporals: car_adeudo_temporals,
        car_tipo_movimientos_personals: car_tipo_movimientos_personals,
        con_contratos: con_contratos,
        con_opciones: con_opciones,
        con_plazos: con_plazos,
        con_proveedores: con_proveedores,
        con_tipo_contratos: con_tipo_contratos,
        dp_beneficiarios: dp_beneficiarios,
        dp_colonias: dp_colonias,
        dp_datospersonales: dp_datospersonales,
        dp_documento_obtenido: dp_documento_obtenido,
        dp_escolaridad: dp_escolaridad,
        dp_estado_civil: dp_estado_civil,
        dp_estados: dp_estados,
        dp_fum_datos_generales: dp_fum_datos_generales,
        dp_hijos: dp_hijos,
        dp_municipios: dp_municipios,
        dp_opciones: dp_opciones,
        dp_paises: dp_paises,
        failed_jobs: failed_jobs,
        fum_datos_generales: fum_datos_generales,
        migrations: migrations,
        model_has_permissions: model_has_permissions,
        model_has_roles: model_has_roles,
        password_reset_tokens: password_reset_tokens,
        per_calentarios: per_calentarios,
        per_opciones_estados: per_opciones_estados,
        per_periodo_licencias: per_periodo_licencias,
        per_registro_facials: per_registro_facials,
        per_registro_permisos: per_registro_permisos,
        per_tipo_permisos: per_tipo_permisos,
        per_tipo_suspencions: per_tipo_suspencions,
        permissions: permissions,
        personal_access_tokens: personal_access_tokens,
        pre_adjuntos: pre_adjuntos,
        pre_capitulos: pre_capitulos,
        pre_cat_verificacion_solicituds: pre_cat_verificacion_solicituds,
        pre_estatuses: pre_estatuses,
        pre_files: pre_files,
        pre_folios: pre_folios,
        pre_fuente_financiamientos: pre_fuente_financiamientos,
        pre_metas_unidads: pre_metas_unidads,
        pre_partidas: pre_partidas,
        pre_programas: pre_programas,
        pre_programatico_presupuestals: pre_programatico_presupuestals,
        pre_proyecto_unidades: pre_proyecto_unidades,
        pre_proyectos: pre_proyectos,
        pre_proyectos_partidas: pre_proyectos_partidas,
        pre_solicitud_facturas: pre_solicitud_facturas,
        pre_solicitud_verificacion: pre_solicitud_verificacion,
        pre_solicituds: pre_solicituds,
        pre_sub_partidas: pre_sub_partidas,
        pre_sub_verificacion_solicituds: pre_sub_verificacion_solicituds,
        role_has_permissions: role_has_permissions,
        roles: roles,
        users: users,
    };
}
