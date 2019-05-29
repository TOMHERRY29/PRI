module.exports = (sequelize, Sequelize) => {
    const Stage = sequelize.define('stage', {
        sujet: {
            type: Sequelize.STRING
        },
        addr: {
            type: Sequelize.STRING
        },
        soutenanceSemaine : {
            type: Sequelize.STRING
        }
    });

    return Stage;
}
