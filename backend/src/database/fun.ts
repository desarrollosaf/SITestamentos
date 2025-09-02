import { Sequelize } from "sequelize"

const sequelizefun = new Sequelize('adminplem_administracion', 'usr_testamentos', '8lv8EXLKNvCovs2tx4MF', {
    host: '192.168.36.53',
    dialect: 'mysql',
    define: {
        freezeTableName: true // evita que Sequelize pluralice
    }
})

export default sequelizefun 