"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con_contratos = void 0;
const sequelize_1 = require("sequelize");
class con_contratos extends sequelize_1.Model {
    static initModel(sequelize) {
        return con_contratos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            direccion_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            proveedor_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            numContratoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fechaContratoProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            plazoServicioProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fechaRecepcionAlmacenProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            oficioCumplimientoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            codigoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            tipocontratoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fechaFirmaProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            contraparteProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            representanteContraparteProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            representantePLProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            responsableTramiteProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fechaInicioProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            fechaTerminoProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            vencimientoProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            montoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            notasProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            periodoProv: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            firmanombrefactura: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            fianzaGarantia: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            incumplimientoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            convenioModifiatorio: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            file_contratoenProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            nombreCompletoProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            observacionesProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            observacionesKarinaProv: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            user_captura_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'con_contratos',
            timestamps: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.con_contratos = con_contratos;
