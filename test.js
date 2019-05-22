var express= require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var UserModel= require("./models/User.js")
var app=express();

var sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dricm"
});

sql.connect(function (err) {
    if(err){
        console.log("error");
    }else{
        console.log("connected");
    }
});

app.set("views", "./views");

app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function (req, res) {
    res.render("signup.jade");
});

app.post('/signup', function (req, res) {
    var obj= {
        username: req.body.username,
        password: req.body.password
    };
    UserModel.createUser(obj);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("server running at 3000");
});


/* ************************************ */
var mysql= require("mysql");
var bcrypt = require("bcryptjs");

var sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dricm"
});

sql.connect(function (err) {
    if(err){
        console.log("error");
    }else{
        console.log("connected");
    }
});

var User= {

}

User.createUser = function createUser(newUser) {
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password,salt, function (err, hash) {
            newUser.password = hash;
            var query = sql.query("INSERT INTO USERS set ?", newUser, function (err, res) {
                console.log(query);
                if(err) {
                    console.log("error");
                }
                else{

                    console.log(res.insertId);
                }
            });
        });
    });

}

module.exports= User;


/* ************************************* */
const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        UserId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Username: {type: STRING, primaryKey: true, allowNull: false},
        Password: STRING
    })
    return User
}

module.exports = UserModel


/* *********************************** */

const PermissionsModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const Permissions = sequelize.define('Permissions', {
        Role: {type: STRING, allowNull: false},
        ControllerAddress: {type: STRING, allowNull: false}
    })
    return Permissions
}

module.exports = PermissionsModel