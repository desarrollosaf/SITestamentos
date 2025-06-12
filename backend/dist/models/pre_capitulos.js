"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_capitulos = void 0;
const sequelize_1 = require("sequelize");
class pre_capitulos extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_capitulos.init({
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
            }
        }, {
            sequelize,
            tableName: 'pre_capitulos',
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
exports.pre_capitulos = pre_capitulos;
