"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
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
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
    },
    fuera_de_matrimonio: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    nombre_fuera: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    primer_apellido_fuera_matri: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundo_apellido_fuera_matri: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'hijos',
    timestamps: true,
});
// Relaciones
// Hijo.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// Hijo.belongsTo(Matrimonio, {
//   foreignKey: 'matrimonioId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// Hijo.belongsTo(Matrimonio, {
//   foreignKey: 'matrimonioId',
//   as: 'matrimonio',
// });
exports.default = Hijo;
