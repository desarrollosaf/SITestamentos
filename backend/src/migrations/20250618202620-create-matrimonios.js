'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matrimonios', {
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
      orden: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      primer_apellido: {
        type: Sequelize.STRING
      },
      segundo_apellido: {
        type: Sequelize.STRING
      },
      regimen_patrimonial: {
        type: Sequelize.STRING
      },
      vive: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('matrimonios');
  }
};