const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const userData = require('../models/user');
const authMdw = require('../middlewares/auth');
const guestMdw = require('../middlewares/guest');
const userLoginMdw = require('../middlewares/userLogin');
const userCreateMdw = require('../middlewares/userCreate');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'sportwear/public/imgUsers')
  },  
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

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

const controller = require('../controllers/authController');
const { nextTick } = require('process');

router.get('/register', guestMdw, controller.register);
router.post('/register', guestMdw, upload.any(), userCreateMdw, controller.newUser);

router.get('/login', guestMdw, controller.login);
router.get('/:id/edit', controller.formEdit);
router.put('/:id', upload.any(), controller.update); 

router.post('/login', guestMdw, userLoginMdw, controller.loginExistingUser);

router.get('/profile', authMdw, controller.profile);
router.post('/logOut', authMdw, controller.logOut);

module.exports = router;
