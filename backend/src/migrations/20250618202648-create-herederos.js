'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('herederos', {
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      solicitudId: {
        type: Sequelize.UUID,
        references: {
          model: 'solicituds',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      nombre_completo: {
        type: Sequelize.STRING
      },
      porcentaje: {
        type: Sequelize.STRING
      },
      menor_edad: {
        type: Sequelize.BOOLEAN
      },
      derecho_acrecer: {
        type: Sequelize.BOOLEAN
      },
      tipo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('herederos');
  }
};