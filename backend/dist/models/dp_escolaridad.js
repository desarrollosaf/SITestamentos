"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_escolaridad = void 0;
const sequelize_1 = require("sequelize");
class dp_escolaridad extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_escolaridad.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            escolaridad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'dp_escolaridad',
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
exports.dp_escolaridad = dp_escolaridad;
