// const ville = require('../models/ville.js');

module.exports = (sequelize, DataTypes) => {
    var Pays = sequelize.define('Pays', {
        nomPays : DataTypes.STRING,
      
    }/*, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          models.Pays.hasMany(models.Ville);
        }
      }
}*/);
    return Pays;
  };












/* module.exports = (sequelize, DataTypes) => {
    var Pays = sequelize.define('Pays', {
        nomPays : DataTypes.STRING,
      
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          models.Pays.hasMany(models.Ville);
        }
      }
    });
    return Pays;
  }; */
