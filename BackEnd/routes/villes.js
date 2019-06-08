const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  VILLES ***********/
//récupérer tout les villes
app.get('/villes',(req,res)=>{
    mysqlConnection.query('SELECT * FROM vile',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

//avoir les infos d'une seul ville en fonction de son ID
app.get('/villes/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM ville WHERE idVille = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'une ville
app.delete('/villes/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM ville WHERE idVille = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Ajouter une ville
app.post('/villes', (req, res) => {
    let stud = req.body;
    var sql = "SET @idTuteur = ?;SET @nomVille = ?;SET @idPays = ?; \
    CALL villeAjoutOuModification(@idTuteur,@nomVille,@idPays);";
    mysqlConnection.query(sql, [stud.idTuteur, stud.nomVille, stud.idPays], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('tuteur inseré id : '+element[0].idStagiaire);
                   res.send('tuteur inseré id' );
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour une ville
app.put('/villes', (req, res) => {
    let stud = req.body;
    var sql = "SET @idTuteur = ?;SET @nomVille = ?;SET @idPays = ?; \
    CALL villeAjoutOuModification(@idTuteur,@nomVille,@idPays);";
    mysqlConnection.query(sql, [stud.idTuteur, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('tuteur mis à jour');
            });
        else
            console.log(err);
    })
});