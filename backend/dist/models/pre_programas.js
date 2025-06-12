"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_programas = void 0;
const sequelize_1 = require("sequelize");
class pre_programas extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_programas.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            clave: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pre_programas',
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
exports.pre_programas = pre_programas;
