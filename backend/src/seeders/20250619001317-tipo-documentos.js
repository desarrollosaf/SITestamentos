'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_documentos', [
      {  id: uuidv4(),tipo: 'INE', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'Constancia_situacion_fiscal', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'Acta_nacimiento', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'Acta_matrimonio', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'Comprobante_domicilio', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'CURP', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'certificado_medico_publico', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'certificado_medico_privado', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'Documento_residencia', createdAt: new Date(), updatedAt: new Date() },
    
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_documentos', null, {});
  }
};
