const mysqlConnection = require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  PIECESJOINTES ***********/
//récupérer tout les piecesjointes

app.get('/piecesjointes', (req, res) => {
    mysqlConnection.query('SELECT * FROM piecesjointes', (err, rows, fields) => {
        if (!err) {
            //res.send(rows);//affichage des colonnes de la table si pas d'erreur
            res.status(200).json({
                // message: "Nodes fetched successfully!",
                pieces: rows

            });
        } else
            console.log(err);
    })
});

//avoir les infos d'une seul piecesjointes en fonction de son ID
app.get('/piecesjointes/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM piecesjointes WHERE idPiecesJointes = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//suppression d'une piecesjointes
app.delete('/piecesjointes/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM piecesjointes WHERE idPiecesJointes = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Suppression reussie');
        else
            console.log(err);
    })
});

//Ajouter une piecesjointes
app.post('/piecesjointes', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPiecesJointes = ?;SET @titre = ?;SET @url = ?;SET @idStage \
    CALL piecesjointesAjoutOuModification(@idPiecesJointes,@titre,@url,@idStage);";
    mysqlConnection.query(sql, [stud.idPiecesJointes, stud.titre, stud.url, std.idStage], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                    res.send('Piece jointe inseré id');
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour une piecesjointes
app.put('/piecesjointes', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPiecesJointes = ?;SET @titre = ?;SET @url = ?;SET @idStage \
    CALL piecesjointesAjoutOuModification(@idPiecesJointes,@titre,@url,@idStage);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('Piece jointe mis à jour');
            });
        else
            console.log(err);
    })
});
