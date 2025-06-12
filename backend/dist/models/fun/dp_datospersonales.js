"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_datospersonales = void 0;
const sequelize_1 = require("sequelize");
const fun_1 = __importDefault(require("../../database/fun")); // Conexión específica a 'administracion'
const dp_colonias_1 = require("../fun/dp_colonias");
class dp_datospersonales extends sequelize_1.Model {
    static initModel(sequelize) {
        dp_datospersonales.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            f_nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_primer_apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_segundo_apellido: sequelize_1.DataTypes.STRING(255),
            f_curp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_homclave: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_sexo: sequelize_1.DataTypes.STRING(255),
            f_clave_issemym: sequelize_1.DataTypes.STRING(255),
            f_fecha_nacimiento: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            f_entidad: sequelize_1.DataTypes.STRING(255),
            f_domicilio: sequelize_1.DataTypes.STRING(255),
            f_colonia: sequelize_1.DataTypes.STRING(255),
            f_cedula: sequelize_1.DataTypes.STRING(255),
            f_cp: sequelize_1.DataTypes.STRING(255),
            f_cuenta_bancaria: sequelize_1.DataTypes.STRING(255),
            f_municipio: sequelize_1.DataTypes.STRING(255),
            numint: sequelize_1.DataTypes.STRING(255),
            numext: sequelize_1.DataTypes.STRING(255),
            correo_ins: sequelize_1.DataTypes.STRING(255),
            correo_per: sequelize_1.DataTypes.STRING(255),
            numero_tel: sequelize_1.DataTypes.STRING(255),
            numero_cel: sequelize_1.DataTypes.STRING(255),
            fecha_escolaridad: sequelize_1.DataTypes.STRING(255),
            area_escolaridad: sequelize_1.DataTypes.STRING(255),
            estadocivil_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            sindicalizado_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            sci_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            escolaridad_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            estado_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            municipio_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            colonia_id: sequelize_1.DataTypes.BIGINT.UNSIGNED,
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
            deleted_at: sequelize_1.DataTypes.DATE,
        }, {
            sequelize: fun_1.default, // conexión específica
            tableName: 'dp_datospersonales',
            timestamps: true,
            paranoid: true,
            underscored: true,
        });
        dp_datospersonales.belongsTo(dp_colonias_1.dp_colonias, {
            foreignKey: 'colonia_id',
            as: 'colonia',
        });
        //  dp_datospersonales.belongsTo(dp_escolaridad, {
        //   foreignKey: 'escolaridad_id',
        //   as: 'escolaridad',
        // });
        //  dp_datospersonales.belongsTo(dp_estado_civil, {
        //   foreignKey: 'estadocivil_id',
        //   as: 'estadocivil',
        // });
        //  dp_datospersonales.belongsTo(dp_estados, {
        //   foreignKey: 'estado_id',
        //   as: 'estado',
        // });
        //   dp_datospersonales.belongsTo(dp_municipios, {
        //   foreignKey: 'municipio_id',
        //   as: 'municipio',
        // });
        //  dp_datospersonales.belongsTo(dp_opciones, {
        //   foreignKey: 'sindicalizado_id',
        //   as: 'sindicalizado',
        // });
        // dp_datospersonales.belongsTo(dp_opciones, {
        //   foreignKey: 'sci_id',
        //   as: 'sci',
        // });
        return dp_datospersonales;
    }
}
exports.dp_datospersonales = dp_datospersonales;
