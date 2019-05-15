const mysql=require('mysql'); //importer le package mysql
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json()); //pour l'utilisation de json

//Connexion à la base de données
var mysqlConnection = mysql.createConnection({
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
app.listen(3000, () => console.log('Le serveur express fonctionne sur le port 3000'));

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

//avoir les infos d'un seul etudiant en fonction de son ID
app.get('/entreprise/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM entreprise WHERE idEntreprise = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//suppression d'un entreprise
app.delete('/entreprise/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM entreprise WHERE idEntreprise = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});


//Ajouter un etudiant
app.post('/entreprise', (req, res) => {
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


//Mettre à jour un etudiant
app.put('/entreprise', (req, res) => {
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

/***********  STAGIARE ***********/
//avoir la liste de TOUtes les stagiares
app.get('/stagiaires',(req,res)=>{
    mysqlConnection.query('SELECT * FROM stagiaire',(err,rows,fields) => {
        if(!err)
        res.send(rows);//affichage des colonnes de la table si pas d'erreur
        else
        console.log(err);
    })
});

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


//Ajouter un pays
app.post('/periode', (req, res) => {
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

//suppression d'un pays
app.delete('/pays/:id',(req,res) => {
    mysqlConnection.query('DELETE FROM periode WHERE idPeriode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Suppression reussie');
        else
        console.log(err);
    })
});


//Ajouter un pays
app.post('/pays', (req, res) => {
    let stud = req.body;
    var sql = "SET @idPeriode = ?;SET @nomPays = ?; \
    CALL entrepriseAjoutOuModification(@idPays,@dateDebut,@dateFin,@idStage);";
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