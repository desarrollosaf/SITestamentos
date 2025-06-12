"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.car_adeudo_temporals = void 0;
const sequelize_1 = require("sequelize");
class car_adeudo_temporals extends sequelize_1.Model {
    static initModel(sequelize) {
        return car_adeudo_temporals.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            solicitante: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            tipo_movimiento_personal_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            tipo_solicitud: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            numero_solicitud: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fecha_solicitud: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            servidor_publico: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            dependencia: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            direccion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            departamento: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            recibe: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            recepcion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            vofo_osfem: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            status: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'car_adeudo_temporals',
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
exports.car_adeudo_temporals = car_adeudo_temporals;
