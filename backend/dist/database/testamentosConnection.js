"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeTestamentos = new sequelize_1.Sequelize('testamentos', 'homestead', 'secret', {
    host: '192.168.10.10',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});
exports.default = sequelizeTestamentos;
