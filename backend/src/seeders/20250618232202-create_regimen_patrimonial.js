'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('regimen_patrimonials', [
      { id: uuidv4(), nombre: 'Sociedad Conyugal', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Separacion de bienes', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Concubinato', createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regimen_patrimonials', null, {});
  }
};
