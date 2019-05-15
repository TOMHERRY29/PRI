const mysql=require('mysql'); //importer le package mysql
const express = require('express');
var app = express();
const bodyParser = require("body-parser");



//Connexion à la base de données
var mysqlConnection = mysql.createConnection({
    //host:'10.181.126.163',
    host:'localhost',
    user:'root',
    password:'',
    database:'gst',
    multipleStatements: true //pour avoir plusieurs instructions dans une seule chaîne

});

//gestion des erreurs
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Connexion a la BDD reussie');
    else
    console.log('Connexion a la BDD echouee'+ JSON.stringify(err,undefined,2));
});


//l'applicatio ecoute le port 3000 à la recherche de connexions
// app.listen(3000, () => console.log('Le serveur express fonctionne sur le port 3000'));

app.use(bodyParser.json()); //pour l'utilisation de json
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

//avoir la liste de TOUtes les entreprises
app.get('/entreprises',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Entreprise',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});
//récupérer tout les stagiaires

  app.get('/stagiaire',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Stagiaire',(err,rows,fields) => {
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

/* app.get('/stagiaire',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Stagiaire',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
}); */
//avoir les infos d'un seul etudiant en fonction de son ID
app.get('/stagiaire/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM Stagiaire WHERE idStagiaire = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un etudiant
app.delete('/stagiaire/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM Stagiaire WHERE idStagiaire = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});


//Ajouter un etudiant
app.post('/stagiaire', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
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


//Mettre à jour un etudiant
app.put('/stagiaire', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('stagiaire mis à jour');
            });
        else
            console.log(err);
    })
});



module.exports = app;