"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testigo = void 0;
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = require("./solicitud");
class Testigo extends sequelize_1.Model {
    static initModel(sequelize) {
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
            nombre: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
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
            paranoid: false,
            underscored: false,
        });
        Testigo.belongsTo(solicitud_1.Solicitud, {
            foreignKey: 'solicitudId',
            as: 'solicitud',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        return Testigo;
    }
}
exports.Testigo = Testigo;
