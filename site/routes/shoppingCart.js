const express = require('express');
const router = express.Router();

const controller = require('../controllers/cartController');

router.get('/index', controller.index);

module.exports = router;
