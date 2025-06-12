"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_adjuntos = void 0;
const sequelize_1 = require("sequelize");
class pre_adjuntos extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_adjuntos.init({
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
            file_adjunto: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'pre_adjuntos',
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
                    name: "pre_adjuntos_id_solicitud_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_solicitud" },
                    ]
                },
            ]
        });
    }
}
exports.pre_adjuntos = pre_adjuntos;
