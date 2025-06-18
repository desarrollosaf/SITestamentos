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
       type: Sequelize.STRING 
      },
      lugar_nacimiento: {
        type: Sequelize.STRING 
      },
      es_primer_testamento: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      sabe_leer: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      sabe_escribir: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      puede_hablar: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      puede_ver: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      puede_oir: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      dificultad_comunicacion: {
        type: Sequelize.BOOLEAN,
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

