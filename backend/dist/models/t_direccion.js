"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Direccion extends sequelize_1.Model {
}
Direccion.init({
    id_Direccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    C_presupDir: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    F_Creacion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    U_Modificacion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    Estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Creado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_Dependencia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    c_presup: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 't_direccion',
    timestamps: false,
    indexes: [
        {
            name: 'id_Direccion',
            using: 'BTREE',
            fields: [{ name: 'id_Direccion' }],
        },
    ],
});
exports.default = Direccion;
