"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
class Heredero extends sequelize_1.Model {
}
Heredero.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    nombre_heredero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    primer_apellido_heredero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    segundo_apellido_heredero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    parentesco: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    porcentaje: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    derecho_acrecer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'herederos',
    timestamps: true,
});
// Relación con Solicitud
// Heredero.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
exports.default = Heredero;
