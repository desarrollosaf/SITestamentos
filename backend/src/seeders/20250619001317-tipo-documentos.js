'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_documentos', [
      {  id: uuidv4(),tipo: 'ine', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'constancia_situacion_fiscal', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'acta_nacimiento', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'acta_matrimonio', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'comprobante_domicilio', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'curp', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'certificado_medico_publico', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'certificado_medico_privado', createdAt: new Date(), updatedAt: new Date() },
      {  id: uuidv4(),tipo: 'documento_residencia', createdAt: new Date(), updatedAt: new Date() }, 
      {  id: uuidv4(),tipo: 'identificacion', createdAt: new Date(), updatedAt: new Date() },
    
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_documentos', null, {});
  }
};
