
module.exports = (sequelize, DataTypes) => {
    
    const Product = sequelize.define('Product', {
        
        description: {
            type: DataTypes.STRING(500)
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idCategory: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING(50)
        },
        name: {
            type: DataTypes.STRING(50)
        },
        price: {
            type: DataTypes.DOUBLE
        },
    },

    {
        timestamps : false,
        tableName : 'PRODUCTS'
    });
    
    Product.associate = function(models) {
        // associations can be defined here
        Product.belongsTo(models.Category, {
            as : "category",
            foreignKey : "idCategory"
        });
    };
    
    return Product;
    
};