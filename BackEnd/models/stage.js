module.exports = (sequelize, Sequelize) => {
    const Stage = sequelize.define('stage', {
        sujetStage : {
            type: Sequelize.STRING
        },
        addrStage : {
            type: Sequelize.STRING
        },
        soutenanceSemaine : {
            type: Sequelize.STRING
        },
        periodesStage : {
            type: Sequelize.STRING
        }
    });

    return Stage;
}
