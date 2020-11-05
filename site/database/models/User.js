
module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('User', {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50)
        },
        apellido: {
            type: DataTypes.STRING(50)
        },
        email: {
            type : DataTypes.STRING(60)
        },
        password : {
            type : DataTypes.STRING(200)
        },
        avatar : {
            type : DataTypes.STRING(300)
        },
        idRol : {
            type : DataTypes.INTEGER
        }
    },
    {
        timestamps : false,
        tableName : 'USERS'
    });
    
    User.associate = function(models) {
        // associations can be defined here
        User.belongsTo(models.Rol, {
            as : "rol",
            foreignKey : "idRol"
        });
    };
    
    return User;
};