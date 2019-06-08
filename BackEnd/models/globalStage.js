module.exports = (sequelize, Sequelize) => {
    const globalStage = sequelize.define('globalStage', {
        nomStagiaire: {
            type: Sequelize.STRING
        },
        prenomStagiaire: {
            type: Sequelize.STRING
        },
        libelleSemestre: {
            type: Sequelize.STRING
        },
        addrStage: {
            type: Sequelize.STRING
        },
        nomEntreprise: {
            type: Sequelize.STRING
        },
        nomVille: {
            type: Sequelize.STRING
        },
        nomPays: {
            type: Sequelize.STRING
        },
        sujetStage: {
            type: Sequelize.STRING
        },
        soutenanceSemaine: {
            type: Sequelize.STRING
        },
    });

    return globalStage;
}
