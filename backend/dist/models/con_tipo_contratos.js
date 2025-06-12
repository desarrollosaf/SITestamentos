"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con_tipo_contratos = void 0;
const sequelize_1 = require("sequelize");
class con_tipo_contratos extends sequelize_1.Model {
    static initModel(sequelize) {
        return con_tipo_contratos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            tipo: {
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
            tableName: 'con_tipo_contratos',
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
exports.con_tipo_contratos = con_tipo_contratos;
