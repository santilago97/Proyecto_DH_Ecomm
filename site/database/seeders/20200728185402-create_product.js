'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('products', [
      
      {Name: 'Seeder1', 
      Description: 'Seeder1Ape', 
      Image: '/imgProds/RealMadrid.jpg', 
      Price: 3500,
      idCategory: 1},
      
      {Name: 'Seeder2', 
      Description: 'Seeder2Ape', 
      Image: '/imgProds/RealMadrid.jpg', 
      Price: 3500,
      idCategory: 1},
      
      {Name: 'Seeder3', 
      Description: 'Seeder3Ape', 
      Image: '/imgProds/RealMadrid.jpg', 
      Price: 3500,
      idCategory: 1},
      
    ])
  },
  
  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('products', null, {});
    
  }
};
