const {body,check} = require('express-validator');
const bcryptjs = require('bcrypt');
const db = require('./../database/models')

module.exports = 

[
  
  //El login deberia dar un mensaje ambiguo cuando ingreso datos por eso le comento la validación 
  //check('password').isLength({min:5}).withMessage('La contraseña debe contener al menos 5 caracteres').bail(),
  check('email').isEmail().withMessage('Formato de email inválido')
  .custom((value, { req }) => {
    return db.User.findOne({where :{email : value}}).then(user => {
      if (user == null) {
        return Promise.reject('Datos erróneos');
      } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
        return Promise.reject('Datos erróneos');
      }
    })
  }),
]