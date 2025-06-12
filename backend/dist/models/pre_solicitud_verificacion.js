"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_solicitud_verificacion = void 0;
const sequelize_1 = require("sequelize");
class pre_solicitud_verificacion extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_solicitud_verificacion.init({
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
            id_verificacion: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'pre_sub_verificacion_solicituds',
                    key: 'id'
                }
            },
            id_validador: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            estado: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'pre_solicitud_verificacion',
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
                    name: "pre_solicitud_verificacion_id_solicitud_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_solicitud" },
                    ]
                },
                {
                    name: "pre_solicitud_verificacion_id_verificacion_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_verificacion" },
                    ]
                },
            ]
        });
    }
}
exports.pre_solicitud_verificacion = pre_solicitud_verificacion;
