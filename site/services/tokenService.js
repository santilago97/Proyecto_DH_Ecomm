const db = require('../database/models');
const bcryptjs = require('bcrypt');

module.exports = {
    generateToken : async (res, user) => {
        //TO-DO delete previous tokens
        let token = bcryptjs.hashSync(('_' + user.id + Date.now()), 2);
        let expires = new Date(Date.now() + 1000*60*60*24*90);
        await db.Token.create({ userId : user.id, token : token, expiresAt : expires })
        res.cookie('recordame', token,  {expires: expires});
    },
    getUserByToken : (token) => {
        //devuelve el usuari dado un token

    },
    checkUserToken : (user) => {
        //retorna true si el usuario tiene un token

    },
    verifyToken : function (token) {
        //retorna si el token es correcto y no ha espirado
        //aqui buscar en tabla si existe ese token
        db.Token.findOne({token:token})
            .then(tokenUser => {
                //deberia de revisar si el token expiró
                const fechaActual = new Date();
                if (tokenUser.expiresAt < fechaActual) {
                    //eliminar el token
                    this.deleteToken(token);
                    return false;
                }

                return true;
            })

    },
    deleteToken : (token) => {
        //este elimina el token de la tabla
    }
}