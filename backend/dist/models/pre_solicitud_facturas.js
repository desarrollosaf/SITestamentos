"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_solicitud_facturas = void 0;
const sequelize_1 = require("sequelize");
class pre_solicitud_facturas extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_solicitud_facturas.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            id_solicitud: {
                type: sequelize_1.DataTypes.CHAR(36),
                allowNull: false,
                references: {
                    model: 'pre_solicituds',
                    key: 'id'
                }
            },
            clave_presupuestal: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            id_actividad: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            id_subpartida: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'pre_sub_partidas',
                    key: 'id'
                }
            },
            importeGP: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: false
            },
            rfc_emisor: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            nombre_emisor: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            concepto_gasto: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            folio_factura: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            factura_extranjera: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            tax_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            pais: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            filepdf: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            filexml: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'pre_solicitud_facturas',
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
                    name: "pre_solicitud_facturas_id_solicitud_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_solicitud" },
                    ]
                },
                {
                    name: "pre_solicitud_facturas_id_subpartida_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_subpartida" },
                    ]
                },
            ]
        });
    }
}
exports.pre_solicitud_facturas = pre_solicitud_facturas;
