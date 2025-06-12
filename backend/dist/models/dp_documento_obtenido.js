"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_documento_obtenido = void 0;
const sequelize_1 = require("sequelize");
class dp_documento_obtenido extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_documento_obtenido.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            nombre_documento: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'dp_documento_obtenido',
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
exports.dp_documento_obtenido = dp_documento_obtenido;
