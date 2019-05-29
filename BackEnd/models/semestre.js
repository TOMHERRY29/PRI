module.exports = (sequelize, Sequelize) => {
    const Semestre = sequelize.define('semestre', {
        libelle: {
            type: Sequelize.STRING
        },
        
    });

    return Semestre;
}
