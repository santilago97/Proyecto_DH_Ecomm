
module.exports = (sequelize, DataTypes) => {
    
    const Size = sequelize.define('Size', {
        
        idSize: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(20)
        }
    },
    
    {
        timestamps : false,
        tableName : 'SIZES'
    });
    
    Size.associate = function(models) {
        // associations can be defined here
        /*Size.hasMany(models.CartProduct, {
            as : "CartProduct",
            foreingKey : "idSize"
        });*/
    };
    
    return Size;
    
};