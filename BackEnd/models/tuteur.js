module.exports = (sequelize, Sequelize) => {
    const Tuteur = sequelize.define('tuteur', {
        NomTuteur: {
            type: Sequelize.STRING
        },
        PrenomTuteur: {
            type: Sequelize.STRING
        }
    });

    return Tuteur;
}

