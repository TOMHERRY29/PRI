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
db.globalStage = require('./models/globalStage')(sequelize, Sequelize);
db.stagiaires = require('./models/stagiaire.js')(sequelize, Sequelize);//
db.pays = require('./models/pays.js')(sequelize, Sequelize);//
db.ville = require('./models/ville.js')(sequelize, Sequelize);//
db.entreprise = require('./models/entreprise')(sequelize, Sequelize);//
db.periode = require('./models/periode')(sequelize, Sequelize);//
db.piecesjointes = require('./models/piecesJointes')(sequelize, Sequelize);//
db.semestre = require('./models/semestre')(sequelize, Sequelize);//
db.stage = require('./models/stage')(sequelize, Sequelize);//
db.tuteur = require('./models/tuteur')(sequelize, Sequelize);//
db.stagePostuler = require('./models/stagePostuler')(sequelize, Sequelize);//
// relations
//db.pays.hasOne(db.ville);
db.pays.hasMany(db.ville); 
db.tuteur.hasMany(db.stage); 
db.stagiaires.hasMany(db.stage); 
db.semestre.hasMany(db.stage);
db.ville.hasMany(db.stage); 
db.entreprise.hasMany(db.stage); 
db.stage.hasMany(db.piecesjointes); 
db.stage.hasMany(db.periode); 
db.tuteur.hasMany(db.stagePostuler);
db.stage.hasMany(db.stagePostuler);


/* db.pays.hasOne(db.ville); 
db.tuteur.hasOne(db.stage); 
db.stagiaires.hasOne(db.stage); 
db.semestre.hasOne(db.stage);
db.ville.hasOne(db.stage); 
db.entreprise.hasOne(db.stage); 
db.stage.hasOne(db.piecesjointes); 
db.stage.hasOne(db.periode);  */



module.exports = db;