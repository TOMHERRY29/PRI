const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app
/***********  PERIODE ***********/
//avoir la liste de TOUtes les pays
app.get('/periode',(req,res)=>{
    mysqlConnection.query('SELECT * FROM periode',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

//avoir les infos d'une seul periode en fonction de son ID
app.get('/periode/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM periode WHERE idPeriode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Ajouter une période
app.post('/periode', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPays = ?;SET @nomPays = ?; \
    CALL periodeAjoutOuModification(@idPays,@nomPays);";
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

//Mettre à jour une période
app.put('/periode', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPays = ?;SET @nomPays = ?; \
    CALL periodeAjoutOuModification(@idPays,@nomPays);";
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

//suppression d'une periode
app.delete('/periode/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM periode WHERE idPeriode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});