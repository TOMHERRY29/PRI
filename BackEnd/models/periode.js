module.exports = (sequelize, Sequelize) => {
    const Periode = sequelize.define('periode', {
        dateDebut : {
            type: Sequelize.DATE
        },
        dateFin : {
            type: Sequelize.DATE
        }
    });

    return Periode;
}
