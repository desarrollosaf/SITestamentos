"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_datospersonales = void 0;
const sequelize_1 = require("sequelize");
class dp_datospersonales extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_datospersonales.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            f_nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_primer_apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_segundo_apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            f_curp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_homclave: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
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
                allowNull: false
            },
            f_entidad: {
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
            numint: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            numext: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            estadocivil_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_estado_civil',
                    key: 'id'
                }
            },
            sindicalizado_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_opciones',
                    key: 'id'
                }
            },
            sci_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_opciones',
                    key: 'id'
                }
            },
            escolaridad_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_escolaridad',
                    key: 'id'
                }
            },
            nivel_escolaridad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            estado_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_estados',
                    key: 'id'
                }
            },
            municipio_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_municipios',
                    key: 'id'
                }
            },
            colonia_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_colonias',
                    key: 'id'
                }
            },
            correo_ins: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            correo_per: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            numero_tel: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            numero_cel: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fecha_escolaridad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            area_escolaridad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'dp_datospersonales',
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
                {
                    name: "dp_datospersonales_estadocivil_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "estadocivil_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_sindicalizado_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "sindicalizado_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_sci_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "sci_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_escolaridad_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "escolaridad_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_estado_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "estado_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_municipio_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "municipio_id" },
                    ]
                },
                {
                    name: "dp_datospersonales_colonia_id_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "colonia_id" },
                    ]
                },
            ]
        });
    }
}
exports.dp_datospersonales = dp_datospersonales;
