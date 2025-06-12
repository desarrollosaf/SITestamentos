"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_folios = void 0;
const sequelize_1 = require("sequelize");
class pre_folios extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_folios.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            folio: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            tipo: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pre_folios',
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
exports.pre_folios = pre_folios;
