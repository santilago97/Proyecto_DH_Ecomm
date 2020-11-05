'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('roles', [
      
      {Description: 'Seeder1Rol'},
      {Description: 'Seeder2Rol'},
      {Description: 'Seeder3Rol'},

    ])
  },
  
  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('roles', null, {});
    
  }
};