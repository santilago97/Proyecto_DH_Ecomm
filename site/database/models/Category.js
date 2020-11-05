
module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define('Category', {
        
        description: {
            type: DataTypes.STRING(20)
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        
    },
    
    {
        timestamps : false,
        tableName : 'CATEGORIES'
    });
    
    Category.associate = function(models) {
        // associations can be defined here
        Category.hasMany(models.Product, {
            as : "Products",
            foreignKey : "idCategory"
        });
    };
    
    return Category;
    
};