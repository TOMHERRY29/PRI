const mysqlConnection=require('../index.js').mysqlConnection; //importer mysqlConnection
var app = require('../index.js').app; //importer app

/***********  SEMESTRE ***********/
//récupérer tout les semestres

app.get('/semestres',(req,res)=>{
    mysqlConnection.query('SELECT * FROM semestre',(err,rows,fields) => {
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

//avoir les infos d'un seul semestre en fonction de son ID
app.get('/semestres/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM semestre WHERE idSemestre = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un semestre
app.delete('/semestres/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM piecesjointes WHERE 	idSemestre = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});

//Ajouter un semestre
app.post('/semestres', (req, res) => {
    let stud = req.body;
    var sql = "SET @idSemestre = ?;SET @libelle = ?; \
    CALL semestreAjoutOuModification(@idSemestre,@libelle);";
    mysqlConnection.query(sql, [stud.idSemestre, stud.libelle], (err, rows, fields) => {
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


//Mettre à jour un semestre
app.put('/semestres', (req, res) => {
    let stud = req.body;
    var sql = "SET @idSemestre = ?;SET @libelle = ?; \
    CALL semestreAjoutOuModification(@idSemestre,@libelle);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Piece jointe mis à jour');
            });
        else
            console.log(err);
    })
});