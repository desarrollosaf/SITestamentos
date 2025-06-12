"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con_opciones = void 0;
const sequelize_1 = require("sequelize");
class con_opciones extends sequelize_1.Model {
    static initModel(sequelize) {
        return con_opciones.init({
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
            tableName: 'con_opciones',
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
exports.con_opciones = con_opciones;
