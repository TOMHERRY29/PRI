/* const mysql = require('mysql'); //importer le package mysql
const express = require('express');
var app = express();
const bodyParser = require("body-parser");
const stagiaireRoutes = require('./routes/testStagiaires');

const mysqlConnection = require('./connexion');

 
 mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connexion a la BDD reussie');
    else
        console.log('Connexion a la BDD echouee' + JSON.stringify(err, undefined, 2));
});


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

app.route('/stages',require('./routes/stages'));
app.route('/stagiaires',require('./routes/stagiaires')); 
app.route('/villes',require('./routes/villes'));
app.route('/entreprises',require('./routes/entreprises'));
app.route('/pays',require('./routes/pays'));
app.route('/periodes',require('./routes/periodes'));
app.route('/piecesjointes',require('./routes/piecesjointes'));
app.route('/semestres',require('./routes/semestres'));


// app.use('/stagiaires',stagiaireRoutes);





module.exports = app;
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

 
const db = require('./db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
 
require('./routes/testStagiaires.js')(app);
 
// Create a Server
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})




