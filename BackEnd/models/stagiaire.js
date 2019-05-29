module.exports = (sequelize, Sequelize) => {
    const Stagiaire = sequelize.define('stagiaire', {
        Nom: {
            type: Sequelize.STRING
        },
        Prenom: {
            type: Sequelize.STRING
        }
    });

    return Stagiaire;
}





/* const Sequelize = require('sequelize');
const db = require('../connexion');


const StagiaireModel = db.define('Stagiaire', {
    idStagiaire: {
        type: Sequelize.STRING
    },
    Nom: {
        type: Sequelize.STRING
    },
    Prenom: {
        type: Sequelize.STRING
    },
})


 */
/* const StagiaireModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const Stagiaire = sequelize.define('Stagiaire', {
        idStagiaire: {type: STRING, primaryKey: true},
        Nom:STRING,
        Prenom: STRING        
    })
    return Stagiaire
} */

/* module.exports = StagiaireModel */
