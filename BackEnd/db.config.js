const env = require('./connexion.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.user, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.stagiaires = require('./models/stagiaire.js')(sequelize, Sequelize);
db.pays = require('./models/pays.js')(sequelize, Sequelize);
db.ville = require('./models/ville.js')(sequelize, Sequelize);
db.globalStage = require('./models/globalStage')(sequelize, Sequelize);
db.pays.hasOne(db.ville);
//db.pays.hasMany(db.ville); */
module.exports = db;