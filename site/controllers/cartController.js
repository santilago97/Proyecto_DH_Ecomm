const db = require('../database/models');
const { Op } = require('sequelize');
const path = require('path');


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-8661787710688174-080823-0cecf51bd07b5abdca3fe068339ea1b3-94696084'
});

// Procesando el pago

var preference = {
    items: [
        {
            title: 'Mi carrito de compras',
            unit_price: 18066,
            quantity: 1,
        }
    ]
};

mercadopago.preferences.create(preference)
.then(function(response){
    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
}).catch(function(error){
    console.log(error);
});


module.exports = {
    
    index : async (req, res) => {

        let offset = 0;
        let limit = 30;
        //si me mandan la pagina entonces voy a calcular el offset
        if (req.query.page) {
            
            offset = (req.query.page - 1) * limit;
        }
        
        let userEmail = req.session.userEmail;
        
        let user = await db.User.findOne({
            
            where : {
                email : userEmail
            }
        })
        
        
        db.ShoppingCart.findAndCountAll({
            
            order : [
                [(req.query.order ? req.query.order : 'Date'), 'DESC']
            ],

            limit : limit,
            offset : offset,
            include : ['user', 'product'],
            where : {
                idUser : user.id
            }
            
        })
        
        .then(function(data) {

            const shoppingCart = data.rows;
            const count = data.count;
            const pages = Math.ceil(count / limit);

            return res.render('shoppingCart/cart', { shoppingCart, pages });
        })
        .catch(function(error){
            console.log(error);
        });

    },
}


