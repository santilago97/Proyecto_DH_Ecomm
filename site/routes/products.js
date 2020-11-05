const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const prodCreate = require ('../middlewares/prodCreate')
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'sportwear/public/imgProds');
    },   
    filename: function (req, file, cb) {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname);
        if (acceptedExtensions.includes(ext)){
            //si es correcto subo la imagen
            cb(null, true);
        } else {
            //aqui guardo la imagen en el body
            req.file = file;
            //le digo que no la suba
            cb(null, false);
        }
     }
  })

const controller = require('../controllers/productController');
const publishMdw = require('../middlewares/publish')
router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});

router.get('/', controller.index);
// Agregar producto al carrito
router.post('/cart/:id?', controller.add);

// Formulario de creacion de producto
router.get('/create', publishMdw,  controller.formCreate);
// Guardamos la publicación
router.post('/create', upload.any(), prodCreate, controller.create);

// Nos muestra el detalle del producto que llega por parametro
router.get('/:id?', controller.detail);

// Nos lleva al formulario de edición del usuario que mandemos por parametro
router.get('/:id/edit', publishMdw, controller.formEdit);
// Actualizar el usuario editado
router.put('/:id', upload.any(), controller.update); 

// Eliminar el producto que mandamos por parametro
router.delete('/:id', controller.delete);

module.exports = router;