"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
const matrimonios_1 = __importDefault(require("./matrimonios"));
class Hijo extends sequelize_1.Model {
}
Hijo.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    matrimonioId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    vive: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    reconocido: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    fuera_de_matrimonio: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    nombre_fuera: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'hijos',
    timestamps: true,
});
// Relaciones
Hijo.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Hijo.belongsTo(matrimonios_1.default, {
    foreignKey: 'matrimonioId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Hijo;
