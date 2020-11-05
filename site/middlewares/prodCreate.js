const {body,check} = require('express-validator');
const path = require('path');
module.exports =    
[
check('name').notEmpty().withMessage('El producto debe tener un nombre'),
check('description').notEmpty().withMessage('El producto debe contar con una descripcion'),
check('price').notEmpty().withMessage('El producto a vender debe tener un precio')
]