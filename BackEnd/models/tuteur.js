module.exports = (sequelize, Sequelize) => {
    const Tuteur = sequelize.define('tuteur', {
        Nom: {
            type: Sequelize.STRING
        },
        Prenom: {
            type: Sequelize.STRING
        }
    });

    return Tuteur;
}

