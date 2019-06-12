
//const pays = require('./models/pays.js');

module.exports = (sequelize, DataTypes) => {
    var StagePostuler = sequelize.define('StagePostuler', {
        commentaire  : DataTypes.STRING
    });
    return StagePostuler;
  };



