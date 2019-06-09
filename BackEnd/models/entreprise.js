module.exports = (sequelize, Sequelize) => {
    const Entreprise = sequelize.define('Entreprise', {
        nomEntreprise  : {
            type: Sequelize.STRING
        }
    });

    return Entreprise;
}
