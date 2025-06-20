"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
class TestamentoPasados extends sequelize_1.Model {
}
TestamentoPasados.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    fecha_tramite: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    notaria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    instrumento_volumen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    path_testamento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'testamentos_pasados',
    timestamps: true,
});
// Relaciones
// TestamentoPasados.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
exports.default = TestamentoPasados;
