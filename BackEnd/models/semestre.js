module.exports = (sequelize, Sequelize) => {
    const Semestre = sequelize.define('semestre', {
        libelleSemestre: {
            type: Sequelize.STRING
        },
        
    });

    return Semestre;
}
