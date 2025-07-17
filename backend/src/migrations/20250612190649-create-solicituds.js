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
       nacionalidad: {
        type: Sequelize.STRING 
      },
      es_primer_testamento: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      sabe_leer: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      sabe_escribir: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      puede_hablar: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      puede_ver: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      puede_oir: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      dificultad_comunicacion: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      no_pasaporte: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      cedula_profesional: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      documento_residencia: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      heredero_menor_edad: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      documento_identifica: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      numero_documento_identifica: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
       indique_nacionalidad_serv: {
        type: Sequelize.STRING,
        allowNull: true, 
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

