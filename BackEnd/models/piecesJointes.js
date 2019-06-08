module.exports = (sequelize, Sequelize) => {
    const Piece = sequelize.define('piecesjointes', {
        titre : {
            type: Sequelize.STRING
        },
        url : {
            type: Sequelize.STRING
        }
    });

    return Piece;
}

