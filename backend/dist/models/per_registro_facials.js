"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_registro_facials = void 0;
const sequelize_1 = require("sequelize");
class per_registro_facials extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_registro_facials.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            opcion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'per_registro_facials',
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
exports.per_registro_facials = per_registro_facials;
