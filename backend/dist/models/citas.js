"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection")); // Ajusta la ruta si es necesario
class Cita extends sequelize_1.Model {
}
Cita.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    rfc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    hora: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'citas',
    timestamps: true, // Sequelize generará y actualizará automáticamente createdAt y updatedAt
});
exports.default = Cita;
