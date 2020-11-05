'use strict';

const bcryptjs = require('bcrypt');

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('users', [
      
      {Name: 'Seeder1', 
      Apellido: 'Seeder1Ape', 
      Email: '1@1.com', 
      Password: bcryptjs.hashSync('123456', 2), 
      Avatar: '/imgUsers/avatar-1595900387807.jpg',
      idRol: 1},
      
      {Name: 'Seeder2', 
      Apellido: 'Seeder2Ape', 
      Email: '2@2.com', 
      Password: bcryptjs.hashSync('123456', 2), 
      Avatar: '/imgUsers/avatar-1595900387807.jpg',
      idRol: 1},
      
      {Name: 'Seeder3', 
      Apellido: 'Seeder3Ape', 
      Email: '3@3.com', 
      Password: bcryptjs.hashSync('123456', 2), 
      Avatar: '/imgUsers/avatar-1595900387807.jpg',
      idRol: 1},
      
    ])
  },
  
  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('users', null, {});
    
  }
};
