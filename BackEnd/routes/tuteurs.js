const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  TUTEURS ***********/
//récupérer tout les tuteurs
app.get('/tuteurs',(req,res)=>{
    mysqlConnection.query('SELECT * FROM tuteur',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

//avoir les infos d'un seul tuteur en fonction de son ID
app.get('/tuteurs/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM tuteur WHERE idTuteur = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un tuteur
app.delete('/tuteurs/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM tuteur WHERE idTuteur = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Ajouter un tuteur
app.post('/tuteurs', (req, res) => {
    let stud = req.body;
    var sql = "SET @idTuteur = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL tuteurAjoutOuModification(@idTuteur,@Nom,@Prenom);";
    mysqlConnection.query(sql, [stud.idTuteur, stud.Nom, stud.Prenom], (err, rows, fields) => {
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


//Mettre à jour un tuteur
app.put('/stagiaires', (req, res) => {
    let stud = req.body;
    var sql = "SET @idTuteur = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL tuteurAjoutOuModification(@idTuteur,@Nom,@Prenom);";
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