"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_proyecto_unidades = void 0;
const sequelize_1 = require("sequelize");
class pre_proyecto_unidades extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_proyecto_unidades.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            id_proyecto: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'pre_proyectos',
                    key: 'id'
                }
            },
            direccion: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pre_proyecto_unidades',
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
                {
                    name: "pre_proyecto_unidades_id_proyecto_foreign",
                    using: "BTREE",
                    fields: [
                        { name: "id_proyecto" },
                    ]
                },
            ]
        });
    }
}
exports.pre_proyecto_unidades = pre_proyecto_unidades;
