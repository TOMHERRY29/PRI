const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  PAYS ***********/
//avoir la liste de TOUtes les pays
app.get('/pays',(req,res)=>{
    mysqlConnection.query('SELECT * FROM pays',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

//avoir les infos d'un seul pays en fonction de son ID
app.get('/pays/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM pays WHERE idPays = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un pays
app.delete('/pays/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM pays WHERE idPays = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Mettre à jour un pays
app.put('/pays', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPays = ?;SET @nomPays = ?; \
    CALL paysAjoutOuModification(@idPays,@nomPays);";
    mysqlConnection.query(sql, [stud.idEntreprise, stud.nomEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                   res.send('Pays inseré id' );
                }
            });
        else
            console.log(err);
    })
});

//Ajouter un pays
app.post('/pays', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPeriode = ?;SET @nomPays = ?; \
    CALL paysAjoutOuModification(@idPays,@dateDebut,@dateFin,@idStage);";
    mysqlConnection.query(sql, [stud.idPeriode, stud.dateDebut, stud.dateFin, stud.idStage], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                   res.send('Pays inseré id' );
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour un pays
app.put('/pays', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPays = ?;SET @nomPays = ?; \
    CALL entrepriseAjoutOuModification(@idPays,@nomPays);";
    mysqlConnection.query(sql, [stud.idEntreprise, stud.nomEntreprise], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array){                   
                   // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                   res.send('Pays inseré id' );
                }
            });
        else
            console.log(err);
    })
});
