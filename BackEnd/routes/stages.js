const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  STAGES ***********/
//récupérer tout les stages

app.get('/stages',(req,res)=>{
    mysqlConnection.query('select stage.idStage,stage.sujet,stage.addr,stage.soutenanceSemaine,tuteur.Nom,tuteur.Prenom,stagiaire.nom,stagiaire.prenom,semestre.libelle,ville.nomVille,pays.nomPays,entreprise.nomEntreprise from stage,tuteur,stagiaire,semestre,ville,pays,entreprise where stage.idTuteur=tuteur.idTuteur and stage.idSemestre=semestre.idSemestre and stage.idEntreprise=entreprise.idEntreprise and stagiaire.idStagiaire=stage.idStagiaire and stage.idVille=ville.idVille and ville.idPays = pays.idPays;',(err,rows,fields) => {
        if(!err){
        //res.send(rows);//affichage des colonnes de la table si pas d'erreur
        res.status(200).json({
           // message: "Nodes fetched successfully!",
            stagiaires: rows
      
          });
        }
        else
        console.log(err);
    })
});

//avoir les infos d'un seul stage en fonction de son ID
app.get('/stages/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM stage WHERE idStage = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un stage
app.delete('/stages/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM stage WHERE idStage = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Ajouter un stage
app.post('/stages', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStage = ?;SET @sujet = ?;SET @addr = ?;SET @addr = ?;SET @soutenanceSemaine = ?;SET @idTuteur = ?;SET @idStagiaire = ?;SET @idSemestre= ?;SET @idVille = ?;SET @idEntreprise = ?; \
    CALL stageAjoutOuModification(@idStage,@sujet,@addr,@soutenanceSemaine,@idTuteur,@idStagiaire,@idSemestre,@idVille,@idEntreprise);";
    mysqlConnection.query(sql, [stud.idStage, stud.sujet,stud.addr,stud.soutenanceSemaine,stud.idTuteur,stud.idStagiaire,stud.idSemestre, stud.idVille,stud.idEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                   res.send('Piece jointe inseré id' );
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour un stage
app.put('/stages', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStage = ?;SET @sujet = ?;SET @addr = ?;SET @addr = ?;SET @soutenanceSemaine = ?;SET @idTuteur = ?;SET @idStagiaire = ?;SET @idSemestre= ?;SET @idVille = ?;SET @idEntreprise = ?; \
    CALL stageAjoutOuModification(@idStage,@sujet,@addr,@soutenanceSemaine,@idTuteur,@idStagiaire,@idSemestre,@idVille,@idEntreprise);";
    mysqlConnection.query(sql, [stud.idStage, stud.sujet,stud.addr,stud.soutenanceSemaine,stud.idTuteur,stud.idStagiaire,stud.idSemestre, stud.idVille,stud.idEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Piece jointe mis à jour');
            });
        else
            console.log(err);
    })
});