
const db = require('../db.config.js');
const globalStage = db.globalStage;


exports.create = (req, res) => {  
    console.log("insert");
    // Save Book to MySQL database
    globalStage.create({  
        nomStagiaire: req.body.nomStagiaire,
        prenomStagiaire: req.body.prenomStagiaire,
        libelleSemestre: req.body.libelleSemestre,
        addrStage: req.body.addrStage,
        nomEntreprise: req.body.nomEntreprise,
        nomVille: req.body.nomVille,
        nomPays: req.body.nomPays,
        sujetStage: req.body.sujetStage,
        soutenanceSemaine: req.body.soutenanceSemaine
      
    }).then(stage => {
      // Send created book to client
      res.send(stage);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  };

 /*  exports.get = (req, res) => {  
    globalStage.findAll().then( (result) => res.json(result) )
    console.log("globalStage")
    console.log(res); 
    //res.send(result);
  }; */

  exports.get = (req, res, next) => {
    globalStage.findAll().then(documents => {
        res.status(200).json({
            message: "Nodes fetched successfully!",
            stages:documents});
            console.log('++++++++++++++++++++++++++++++++++++++',documents);
    });
  
  /*   setTimeout(() => console.log('++++++++++++++++++++++++++++++++++++++',documents), 2000); */
};

var  findPaysDevice = function(_nomPays){
    globalStage.findAll().then(documents => {
        res.status(200).json({
            message: "Nodes fetched successfully!",
            stages:documents});
    });
    return documents;
  };

/* setTimeout(() => console.log('*******************************************************',findPaysDevice()), 2000); */



/* 
var  findPaysDevice = function(_nomPays){
  
    console.log("***************** findPaysDevice")
    var str = String(pays.findOne({
        where: {
           nomPays: _nomPays
        }
     }).then(pays => {
      console.log("THEN ***************************** ");
        if (pays == null) {
          console.log("if ***************************** ");
          var test ='4';
          //idPay='';
          return test;
        }else {
          console.log("Pays trouve******************************* "+_nomPays+" paysIdPay "+pays.dataValues.id)
          //idPay = idVille;
          //console.log("pays "+pays.idPay);
          return pays.dataValues.id;
        }
     }));
     console.log(typeof(str));
     return str;
  };
 */


