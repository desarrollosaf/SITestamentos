"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_proyectos_partidas = void 0;
const sequelize_1 = require("sequelize");
class pre_proyectos_partidas extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_proyectos_partidas.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            proyecto: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            centro_de_costo: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            id_fuente_financiamientos: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            capitulo: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            partida: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pre_proyectos_partidas',
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
exports.pre_proyectos_partidas = pre_proyectos_partidas;
