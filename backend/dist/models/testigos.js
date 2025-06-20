"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
class Testigo extends sequelize_1.Model {
}
Testigo.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    nombre_testigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    primer_apellido_testigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundo_apellido_testigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_naciento: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    lugar_nacimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    curp_dato: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estado_civil: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ocupacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    domicilio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    rfc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    identificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    curp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    comprobante_domicilio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    tableName: 'testigos',
    timestamps: true,
});
// Relación con Solicitud
// Testigo.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
exports.default = Testigo;
