"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_colonias = void 0;
const sequelize_1 = require("sequelize");
class dp_colonias extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_colonias.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                defaultValue: ""
            },
            ciudad: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            municipio: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'dp_municipios',
                    key: 'id'
                }
            },
            asentamiento: {
                type: sequelize_1.DataTypes.STRING(25),
                allowNull: true
            },
            codigo_postal: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'dp_colonias',
            timestamps: false,
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
                    name: "index_municipio",
                    using: "BTREE",
                    fields: [
                        { name: "municipio" },
                    ]
                },
                {
                    name: "index_nombre",
                    using: "BTREE",
                    fields: [
                        { name: "nombre" },
                    ]
                },
                {
                    name: "index_asentamiento",
                    using: "BTREE",
                    fields: [
                        { name: "asentamiento" },
                    ]
                },
                {
                    name: "index_codigo_postal",
                    using: "BTREE",
                    fields: [
                        { name: "codigo_postal" },
                    ]
                },
                {
                    name: "index_ciudad",
                    using: "BTREE",
                    fields: [
                        { name: "ciudad" },
                    ]
                },
            ]
        });
    }
}
exports.dp_colonias = dp_colonias;
