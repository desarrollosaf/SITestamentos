"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_opciones = void 0;
const sequelize_1 = require("sequelize");
class dp_opciones extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_opciones.init({
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
            tableName: 'dp_opciones',
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
exports.dp_opciones = dp_opciones;
