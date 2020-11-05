const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/products.json');

let productData = {
    
    findAll : function () {
        // verificamos si el archivo existe
        if (!fs.existsSync(fileData)){
            fs.writeFileSync(fileData, '');
        }
        // leemos el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertimos el json a un array, mientras validamos que existan datos

        let products = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return products;
    },

    findId : function(id) {
        return this.findAll().find(function(product) {
            return product.id == id;
        });
    },

    create : function (product) {

        let productList = this.findAll();
        // llamamos a lastID para setear el ultimo id correspondiente
        product.id = this.lastId();
        // agregamos el producto al listado
        productList.push(product);
        // lo transformamos a JSON
        jsonProductList = JSON.stringify(productList, null, " ");
        // por ultimo escribimos el archivo
        fs.writeFileSync(fileData, jsonProductList);

    },

    // funcion que nos busca el ultimo id para setear al nuevo producto
    lastId : function (){
        let productList = this.findAll();
        let lastId = 0;
        for (product of productList) {
            if (lastId < product.id) {
                lastId = product.id;
            }
        }
        return lastId + 1;
    },

    update : function(productUpdate) {

        // Inicializamos la lista de productos con todo lo que contiene el products.json
        let productList = this.findAll();
        
        // Dejamos en el array todos los elementos que sean distintos al que vamos a actualizar para reemplazarlo posteriormente
        productList = productList.filter(function(product) {
            return product.id != productUpdate.id ;
        });
        // Agregamos al listado de productos el producto modificado que llega por parámetro
        productList.push(productUpdate);
        
        // Convertimos nuevamente a json el listado
        jsonData = JSON.stringify(productList, null, " ");
        // Y por ultimo, escribimos el archivo
        fs.writeFileSync(fileData, jsonData);
    },

    delete: function(productDelete){

        // Inicializamos la lista de productos con todo lo que contiene el products.json
        let productList = this.findAll();
        
        // Dejamos en el array todos los elementos que sean distintos al que le mandamos, de esa forma lo estamos eliminando
        productList = productList.filter(function(product) {
            return product.id != productDelete.id ;
        });

        // Convertimos nuevamente a json el listado
        jsonData = JSON.stringify(productList, null, " ");
        // Y por ultimo, escribimos el archivo
        fs.writeFileSync(fileData, jsonData);
    }
}

module.exports = productData;
