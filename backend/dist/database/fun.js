"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizefun = new sequelize_1.Sequelize('adminplem_administracion', 'usr_testamentos', '8lv8EXLKNvCovs2tx4MF', {
    host: '192.168.36.53',
    dialect: 'mysql',
    define: {
        freezeTableName: true // evita que Sequelize pluralice
    }
});
exports.default = sequelizefun;
