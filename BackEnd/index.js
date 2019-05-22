const mysql = require('mysql'); //importer le package mysql
const express = require('express');
var app = express();
const bodyParser = require("body-parser");

//Connexion à la base de données
var mysqlConnection = mysql.createConnection({
    //host:'10.181.126.163',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gst',
    multipleStatements: true //pour avoir plusieurs instructions dans une seule chaîne

});

//gestion des erreurs
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connexion a la BDD reussie');
    else
        console.log('Connexion a la BDD echouee' + JSON.stringify(err, undefined, 2));
});


//l'applicatio ecoute le port 3000 à la recherche de connexions
//app.listen(3000, () => console.log('Le serveur express fonctionne sur le port 3000'));

app.use(bodyParser.json()); //pour l'utilisation de json
app.use(bodyParser.urlencoded({
    extended: false
}));

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


//
exports.mysqlConnection = mysqlConnection;
exports.app = app;

app.route('/stagiaires',require('./routes/stagiaires'));
app.route('/villes',require('./routes/villes'));
app.route('/entreprises',require('./routes/entreprises'));
app.route('/pays',require('./routes/pays'));
app.route('/periodes',require('./routes/periodes'));
app.route('/piecesjointes',require('./routes/piecesjointes'));
app.route('/semestres',require('./routes/semestres'));






module.exports = app;
