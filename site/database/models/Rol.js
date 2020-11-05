
module.exports = (sequelize, DataTypes) => {
    
    const Rol = sequelize.define('Rol', {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING(50)
        }
    },

    {
        timestamps : false,
        tableName : 'ROLES'
    });
    
    Rol.associate = function(models) {
        // associations can be defined here
        Rol.hasMany(models.User, {
            as : "users",
            foreignKey : "idRol"
        });
    };
    
    return Rol;
    
};