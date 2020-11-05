const db = require('./../database/models')
const {check, validationResult, body} = require('express-validator')
const bcryptjs = require('bcrypt');

module.exports = [

  
  check('name').isLength({min:3}).withMessage('El nombre debe contener 3 caracteres o más'),
  check('email').isEmail().withMessage('Formato de mail inválido')
  .custom(function(value){
    console.log("Ejecutamos el userCreateMdw");
    //validar en la base de datos que no exista
    return db.User.findOne({where :{email : value}}).then(user => {
      if (user != null){
        return Promise.reject('El email ya está en uso');
      }
    })
  }),
  check('password', 'La password debe contener 5 caracteres o más').isLength({min:5}).bail(),
  check('password', 'Las passwords no coinciden')
  .custom((value, { req }) => {
    return value === req.body.confirmarPassword
  }),
  body('avatar').custom((value, { req }) => {

    if(req.files == ''){
        return false;
    }
    return true;
  }).withMessage('Debés subir una imagen en formato JPG, JPEG o PNG para poder registrarte.'),
]