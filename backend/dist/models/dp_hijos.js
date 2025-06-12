"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_hijos = void 0;
const sequelize_1 = require("sequelize");
class dp_hijos extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_hijos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            sexo_dp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            fecha_dp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'dp_hijos',
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
exports.dp_hijos = dp_hijos;
