"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_opciones_estados = void 0;
const sequelize_1 = require("sequelize");
class per_opciones_estados extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_opciones_estados.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            opcion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'per_opciones_estados',
            timestamps: true,
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
exports.per_opciones_estados = per_opciones_estados;
