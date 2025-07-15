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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primer_apellido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_apellido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      regimen_patrimonial: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vive: {
        type: Sequelize.INTEGER,
        allowNull: true,
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