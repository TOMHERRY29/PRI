/* const mysql = require('mysql'); //importer le package mysql
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gst',
    multipleStatements: true //pour avoir plusieurs instructions dans une seule chaîne

}); */

const mysqlConnection =  {
    password: '',
    database: 'gstStage',
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    multipleStatements: true//pour avoir plusieurs instructions dans une seule chaîne

};



/* const mysqlConnection = mysql.createConnection({
    host:'192.168.43.188',
    user: 'stage',
    password: 'mouna@94',
    database: 'gst',
    multipleStatements: true //pour avoir plusieurs instructions dans une seule chaîne

}); */


module.exports = mysqlConnection;
