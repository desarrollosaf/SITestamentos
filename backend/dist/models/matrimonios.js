"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const hijos_1 = __importDefault(require("./hijos"));
class Matrimonio extends sequelize_1.Model {
}
Matrimonio.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    regimen_patrimonial: {
        type: sequelize_1.DataTypes.STRING,
    },
    vive: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'matrimonios',
    timestamps: true,
});
// Asociación con Solicitud
// Matrimonio.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// Solicitud.hasMany(Hijo, {     
//   foreignKey: 'matrimonioId',
//   as: 'hijos',
// });
Matrimonio.hasMany(hijos_1.default, {
    foreignKey: 'matrimonioId',
    as: 'hijos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Matrimonio;
