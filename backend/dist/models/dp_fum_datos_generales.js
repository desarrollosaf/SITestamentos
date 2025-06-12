"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_fum_datos_generales = void 0;
const sequelize_1 = require("sequelize");
class dp_fum_datos_generales extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_fum_datos_generales.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            f_nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_primer_apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_segundo_apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_curp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_homclave: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_sexo: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_clave_issemym: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_fecha_nacimiento: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_entidad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_sci: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_estado_civil: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_escolaridad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_domicilio: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_colonia: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_cedula: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_cp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_cuenta_bancaria: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_municipio: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            funciones_p: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            num_int: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            num_ext: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'dp_fum_datos_generales',
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.dp_fum_datos_generales = dp_fum_datos_generales;
