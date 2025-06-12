'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicituds', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'  
      },
      lugar_nacimiento: {
        type: Sequelize.STRING 
      },
      acta_nacimiento: {
        type: Sequelize.STRING 
      },
      acta_matrimonio: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      identificacion: {
        type: Sequelize.STRING 
      },
      curp: {
        type: Sequelize.STRING 
      },
      comprobante_domicilio: {
        type: Sequelize.STRING 
      },
      certificado_privado: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      certificado_publico: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      fecha_envio: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('solicituds');
  }
};