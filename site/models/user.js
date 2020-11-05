const fs = require('fs');
const path = require('path');
    
const usersData = path.join(__dirname, '../data/users.json');


let userData = {
    findAll: function () {

        if (!fs.existsSync(usersData)) {

            fs.writeFileSync(usersData, '');
            
        }

        let jsonFile = fs.readFileSync(usersData, 'utf8');

        let users = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);

        return users;
    },

    create: function (user) {
        let array = this.findAll();

        user.id = this.lastID();

        array.push(user);

        jsonData = JSON.stringify(array, null, " ");

        fs.writeFileSync(usersData, jsonData);
    },

    lastID: function () {

        let array = this.findAll();

        let lastID = 0;

        for (user of array) {
            if (lastID < user.id) {
                lastID = user.id;
            }
        }

        return lastID + 1;
    },

    filterByName: function (name) {
        
        let array = this.findAll();

        return array.filter(function (user) {

        search = new RegExp(name.toLowerCase())

        return user.name.toLowerCase().search(search) >= 0;

        });
    },

    findByEmail : function (email) {
        return this.findAll().find(function(user){
            return user.email == email;
        });
    },

    findByPK : function (id) {
        return this.findAll().find(function(user){
            return user.id == id;
        });
    },

    update : function (editUser) {
        
        let array = this.findAll();

        array = array.filter(function(user){
            return user.id != editUser.id;
        });

        array.push(editUser);

        jsonData = JSON.stringify(array, null, ' ');

        fs.writeFileSync(usersData, jsonData);
    },

    delete : function (deleteUser) {
      
        let array =this.findAll();

        array = array.filter(function(user){
            return user.id != deleteUser;
        });        

        jsonData = JSON.stringify(array, null, ' ');

        fs.writeFileSync(usersData, jsonData);
        
    }
  
};

module.exports = userData;