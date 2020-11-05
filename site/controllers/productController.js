const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const productData = require('../models/products');
const fileData = path.join(__dirname, '../data/products.json');

const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    
    index : (req, res) => {
        
        let products = []
        
        if (req.query.busqueda) {
            
            db.Product.findAll({
                
                include: [
                    {association: "category"},
                    //{association: "cartProduct"}
                ],
                
                where : {
                    name : {
                        [Op.like] : '%' + req.query.busqueda + '%'
                    }
                },
                order : [
                    ['name', 'ASC']
                ]
                
                
            })
            .then(function(products) {
                
                return res.render('product/index', { products });
            })
        } else {
            
            let offset = 0;
            let limit = parseInt(req.query.limit) || 20;
            let dir = 'ASC'
            
            //let limit = 5;
            //si me mandan la pagina entonces voy a calcular el offset
            if (req.query.page) {
                
                offset = (req.query.page - 1) * limit;
                
            }
            
            if (req.query.dir) {
                
                dir = req.query.dir;
                
            }
            
            
            //sino las traigo a todas
            db.Product.findAndCountAll({
                
                order : [
                    [(req.query.order ? req.query.order : 'Name'), dir]
                ],
                //esto lo useré en el paginador
                limit : limit,
                offset : offset,
                include : ['category']
                
            })
            .then(function(data) {
                
                console.log("LIMITE " + limit);
                console.log("OFFSET " + offset);
                const products = data.rows;
                const count = data.count;
                const pages = Math.ceil(count / limit);
                return res.render('product/index', { products, pages });
            })
            .catch(function(error){
                
            });
            //movies = moviesData.findAll();
        }
        // Trabajando con Files
        //products = productData.findAll();
        //res.render('product/index', {products});
    },
    
    // Esta es la función del index que trabaja con files
    /*index : (req, res) => {
        
        let products = []
        products = productData.findAll();
        res.render('product/index', {products});
    },*/
    
    detail : (req, res) => {
        
        // Validar que exista el id
        
        db.Product.findByPk(req.params.id, { include : { all : true, nested : true }})
        .then(function(product){
            res.render('product/detail', {
                product : product
            });
        });
    },
    
    /*
    Función detail para trabajar con files
    detail : (req, res) => {
        
        let products = productData.findAll();
        
        let product = products.find(function (products) {
            
            return req.params.id == products.id;
        });
        
        res.render('product/detail', {
            product : product
        });
    },*/
    
    formEdit : (req, res) => {
        
        // Validar que exista el id de producto
        let productId = req.params.id;
        
        // Traigo las categorias para joinear
        let category = db.Category.findAll();
        
        let product = db.Product.findByPk(req.params.id);
        
        Promise.all([category, product])
        .then(function(datos){
            // Acá es donde tratamos a los resultados : datos
            res.render('product/edit', { product : datos[1], category: datos[0] });
        });
        
    },
    
    /* Funcion de edición para trabajar con files
    formEdit : (req, res) => {
        
        // validamos que existe el id que pasó la url
        let productId = req.params.id;
        
        // pedirle al modelo que busque el producto
        let findedProduct = productData.findId(productId);
        
        
    },*/
    
    update : async (req, res) => {
        
        let productId = req.params.id;
        
        let product = await db.Product.findByPk(productId);
        
        product.description = req.body.description;
        product.idCategory = req.body.idCategory;
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        
        
        if (req.file) {
            
            product.image = req.file.filename;
        }
        console.log("Ejecutamos el update");
        
        await product.save();
        
        res.redirect('/product')
        
    },
    
    /* Update para trabajar con files
    update : (req, res) => {
        
        // busco el producto a editar
        let productId = req.params.id;
        let product = productData.findId(productId);
        
        // Seteamos los nuevos atributos
        product.name = req.body.name;
        product.description = req.body.description;
        product.image = req.body.image;
        product.category = req.body.category;
        product.stock = req.body.stock;
        product.price = req.body.price;
        
        // Le pedimos al modelo que impacte la actualización en el JSON
        productData.update(product);
        
        // Redireccionamos la vista
        res.redirect('/');
    },*/
    
    formCreate: function (req, res) {
        
        let category = db.Category.findAll()
        
        Promise.all([category])
        .then(function(datos){
            // Acá es donde tratamos a los resultados : datos
            
            return res.render ('product/create', {category: datos[0]});
        })
    },      
    
    create : (req, res) => {
        
        const errors= validationResult(req);
        

        console.log("ENTRAMOS AL CONTROLLER CREATE")

        if (!errors.isEmpty()) {
            
            return res.send(errors.mapped());
        }
        
        let image = '';
        if (req.files[0]) {
            
            image = '/imgProds/' + req.files[0].filename;
            
        }
        
        // Armamos el objeto literal
        
        let product = {
            
            name : req.body.name,
            description : req.body.description,
            image : image,
            idCategory : req.body.idCategory,
            price : req.body.price
        } 
        
        db.Product.create(product)
        .then(function(){
            return res.redirect('/');
        }).catch(function(error){
            console.log(error);
            return res.redirect('product/create');
        })
    },
    
    /* SAVE para trabajar con files
    save: function (req, res, next){
        
        let errors= validationResult(req);
        
        if (errors.isEmpty()) {
            
            let image = '';
            if (req.files[0]) {
                //image = '/imgProds/' + req.files.filename
                image = req.files[0].path.replace('public\\imgUsers\\','/imgUsers/')
                console.log(image)
            }
            
            // Armamos el objeto literal
            
            let product = {
                id: req.params.id,
                name : req.body.name,
                description : req.body.description,
                image : image,
                category : req.body.category,
                stock : req.body.quantity,
                price : req.body.price
            } 
            
            productData.create(product);
            return res.redirect('/');
        } else {
            res.render('product/create', {errors: errors.errors})
        }
    },*/
    
    delete : (req, res) => {
        
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        
        return res.redirect('/product');
    },
    /* DELETE para trabajar con files
    delete: (req, res) => {
        
        // validamos que existe el id que pasó la url
        let productId = req.params.id;
        
        // pedirle al modelo que busque el producto
        let findedProduct = productData.findId(productId);
        
        // Le pedimos al modelo que finalmente lo borre y modifique el JSON
        productData.delete(findedProduct);
        
        // Redireccionamos la vista
        res.redirect('/product');
    }*/
    
    add : async (req, res) => {
        
        let productId = req.params.id;
        
        let product = await db.Product.findByPk(productId);

        if (req.session.userEmail){
            
            let userEmail = req.session.userEmail;
            
            let user = await db.User.findOne({
                
                where : {
                    email : userEmail
                }
            })

            let shoppingCartProduct = {
                
                State : "Pendiente",
                Total : product.price,
                idUser : user.id,
                idProduct : productId,
            } 
            
            console.log("GUARDAMOS EL PRODUCTO EN EL CARRITO");
            
            db.ShoppingCart.create(shoppingCartProduct)
            .then(function(){
                return res.redirect('/product');
            }).catch(function(error){
                console.log(error);
                return res.redirect('/product');
            })
        }
        
        else{
            return res.redirect('/auth/login');
        }
        
    }
}
