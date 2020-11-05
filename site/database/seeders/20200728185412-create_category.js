'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('categories', [
      
      {Description: 'SeederCat1'},
      {Description: 'SeederCat2'},
      {Description: 'SeederCat3'},

    ])
  },
  
  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('categories', null, {});
    
  }
};