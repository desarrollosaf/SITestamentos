"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Dependencia extends sequelize_1.Model {
}
Dependencia.init({
    id_Dependencia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    C_presupDep: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    Creado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    F_Creacion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    U_Modificacion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    Estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 't_dependencia',
    timestamps: false,
});
exports.default = Dependencia;
