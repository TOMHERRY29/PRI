
//const pays = require('./models/pays.js');

module.exports = (sequelize, DataTypes) => {
    var Ville = sequelize.define('Ville', {
        nomVille  : DataTypes.STRING,
        
    });
    return Ville;
  };



