const mysql = require('mysql'); //importer mysqlConnection
const express = require('express');
const router = express.Router();
//Connexion à la base de données
var mysqlConnection = mysql.createConnection({
    //host:'10.181.126.163',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gst',
    multipleStatements: true //pour avoir plusieurs instructions dans une seule chaîne

});



/***********  STAGIARE ***********/
//récupérer tout les stagiaires

router.get('/stagiaire', (req, res) => {
    mysqlConnection.query('SELECT * FROM Stagiaire', (err, rows, fields) => {
        if (!err) {
            //res.send(rows);//affichage des colonnes de la table si pas d'erreur
            res.status(200).json({
                stagiaires: rows
            });
        } else
            console.log(err);
    })
});

//avoir la liste de TOUtes les stagiares
router.get('/stagiaires', (req, res) => {
    mysqlConnection.query('SELECT * FROM stagiaire', (err, rows, fields) => {
        if (!err)
            res.send(rows); //affichage des colonnes de la table si pas d'erreur
        else
            console.log(err);
    })
});

//avoir les infos d'un seul stagiaire en fonction de son ID
router.get('/stagiaire/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM Stagiaire WHERE idStagiaire = ?', req.params.id, (err, rows, fields) => {
        if (rows) {
            res.status(200).json(rows);
          } else {
            res.status(404).json({ message: "stagiaire not found!" });
            console.log('+++++++++++stagiaire nottttttttttttt existe+++++++++++ ');
          }
    })
});

//suppression d'un stagiaire
router.delete('/stagiaire/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Stagiaire WHERE idStagiaire = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.send('Suppression reussie');
            res.status(200).json({ message: "stagiaire deleted!" });
        }else
            console.log(err);
    })
});

//Ajouter un stagiaire
router.post('/stagiaire', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    // res.send('stagiaire inseré id : '+element[0].idStagiaire);
                    res.send('stagiaire inseré id');
                }
            });
        else
            console.log(err);
    })
});


//Mettre à jour un etudiant
router.put('/stagiaire', (req, res) => {
    let stud = req.body;
    var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
    CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";
    mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('stagiaire mis à jour');
            });
        else
            console.log(err);
    })
});
