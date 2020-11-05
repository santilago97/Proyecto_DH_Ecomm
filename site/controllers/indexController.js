const db = require('../database/models');
const { Op } = require('sequelize');


module.exports = {

    index: function (req, res) {

        db.Product.findAll({

            order : [
                [(req.query.order ? req.query.order : 'PRICE'), 'DESC']
            ],
            //esto lo useré en el paginador
            limit : 5,
            offset : 3
        })
        .then(function(data) {

            const products = data;
            return res.render('index', { products });
        })
        .catch(function(error){
            console.log(error)
        })
    }
}