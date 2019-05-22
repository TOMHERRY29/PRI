const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app


/***********  ENTREPRISE ***********/
//avoir la liste de TOUtes les entreprises
app.get('/entreprises',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Entreprise',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

//avoir les infos d'une seul entreprise en fonction de son ID
app.get('/entreprises/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM entreprise WHERE idEntreprise = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un entreprise
app.delete('/entreprises/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM entreprise WHERE idEntreprise = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Ajouter une entreprise
app.post('/entreprises', (req, res) => {
    let stud = req.body;
    var sql = "SET @idEntreprise = ?;SET @nomEntreprise = ?; \
    CALL entrepriseAjoutOuModification(@idEntreprise,@nomEntreprise);";
    mysqlConnection.query(sql, [stud.idEntreprise, stud.nomEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                   res.send('stagiaire inseré id' );
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour une entreprise
app.put('/entreprises', (req, res) => {
    let stud = req.body;
    var sql = "SET @idEntreprise = ?;SET @nomEntreprise = ?; \
    CALL entrepriseAjoutOuModification(@idEntreprise,@nomEntreprise);";
    mysqlConnection.query(sql, [stud.idEntreprise, stud.nomEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('stagiaire mis à jour');
            });
        else
            console.log(err);
    })
});