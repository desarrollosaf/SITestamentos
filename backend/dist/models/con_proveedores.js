"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con_proveedores = void 0;
const sequelize_1 = require("sequelize");
class con_proveedores extends sequelize_1.Model {
    static initModel(sequelize) {
        return con_proveedores.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            schemaIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            idIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            legalNameIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            uriIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            schemaAdIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            idAdIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            legalNameAdIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            uriAdIdentifier: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            streetAddress: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            locality: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            region: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            pastalCode: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            countryName: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            nameContact: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            emailContact: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            telContact: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            faxContact: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            url: {
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
            tableName: 'con_proveedores',
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
exports.con_proveedores = con_proveedores;
