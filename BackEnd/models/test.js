
//const pays = require('./models/pays.js');




/* 
module.exports = (sequelize, DataTypes) => {
    var Ville = sequelize.define('Ville', {
        nomVille  : DataTypes.STRING,
        
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          
          models.Ville.belongsTo(models.Pays, {
            foreignKey: 'userId',
            foreignKey: {
              allowNull: false
            }
          });
           
        }
      }
    });
    return Ville;
  }; */