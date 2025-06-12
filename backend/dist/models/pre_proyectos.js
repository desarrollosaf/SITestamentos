"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_proyectos = void 0;
const sequelize_1 = require("sequelize");
class pre_proyectos extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_proyectos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            clave: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            id_programas: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'pre_programas',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'pre_proyectos',
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
                    name: "pre_proyectos_id_programas_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_programas" },
                    ]
                },
            ]
        });
    }
}
exports.pre_proyectos = pre_proyectos;
