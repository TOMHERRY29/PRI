module.exports = (sequelize, Sequelize) => {
    const Entreprise = sequelize.define('entreprise', {
        nomEntreprise  : {
            type: Sequelize.STRING
        }
    });

    return Entreprise;
}
