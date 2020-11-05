'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('sizes', [
      
      {Description: 'SeederSize1'},
      {Description: 'SeederSize2'},
      {Description: 'SeederSize3'},

    ])
  },
  
  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('sizes', null, {});
    
  }
};