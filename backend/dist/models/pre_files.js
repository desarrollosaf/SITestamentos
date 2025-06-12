"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_files = void 0;
const sequelize_1 = require("sequelize");
class pre_files extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_files.init({
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
            filepdf: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            tipo: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'pre_files',
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
                    name: "pre_files_id_solicitud_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_solicitud" },
                    ]
                },
            ]
        });
    }
}
exports.pre_files = pre_files;
