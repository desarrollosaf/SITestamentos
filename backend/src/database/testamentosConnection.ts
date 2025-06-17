// import { Sequelize } from "sequelize"

// const sequelizeTestamentos = new Sequelize('testamentos', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     define: {
//         freezeTableName: true 
//     }
// })

// export default sequelizeTestamentos 


import { Sequelize } from "sequelize"

const sequelizeTestamentos = new Sequelize('adminplem_testamentos', 'usr_testamentos', '8lv8EXLKNvCovs2tx4MF', {
    host: '192.168.36.53',
    dialect: 'mysql',
    define: {
        freezeTableName: true 
    }
})

export default sequelizeTestamentos 
