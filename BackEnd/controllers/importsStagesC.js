
const db = require('../db.config.js');
const pays = db.pays;
const ville = db.ville;

let idPay = '';

async function  findPaysDevice(_nomPays){
  
  console.log("******************* findPaysDevice")
  var strid =  await pays.findOne({
      where: {
         nomPays: _nomPays
      }
   }).then(function(pays) {
      if (pays == null) {
        console.log("Pays introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("Pays trouve******************************* "+_nomPays+" paysIdPay "+pays.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return pays.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
   return strid;

   
};

async function findVilleDevice(_nomVille,id_pays){
  // return the promise itself
  console.log("search Ville "+_nomVille+" Pays : "+id_pays);
  var strid =  await ville.findOne({
      where: {
         nomVille: _nomVille,
         PayId: id_pays
      }
   }).then(function(ville) {
      if (!ville) {
          return '';
      }
      console.log("search Ville "+_nomVille+" Ville id : "+ville.id);
      return ville.id;
   });
   return strid;
};

/*
async function createVilleDevice(_nomVille,_PayID){
  console.log("create Ville "+_nomVille+" Pays : "+_PayID);
  await ville.create({  
      nomVille: _nomVille,
      PayId: _PayID  
  });
}

async function createPaysDevice(_nomPays){
  console.log("create Pays "+_nomPays);
  await pays.create({  
    nomPays: _nomPays  
  });
}*/

exports.create = async (req, res) => {  
   // console.log("req :");
    //console.log(req.body);
    
    var indexStage = 0;
    for (var stage in req.body){
      console.log("stage");
      console.log(req.body[indexStage]);//récupération stage
      _nomVille = req.body[indexStage].nomVille;
      _nomPays = req.body[indexStage].nomPays;
      
      var id_pays = await findPaysDevice(_nomPays);
      
      if(id_pays==''){
        try{
          await pays.create({  
          nomPays: _nomPays  
        });
        id_pays = await findPaysDevice(_nomPays);
      }catch(error ){
        if(id_pays==''){
          console.log('Creation pays erreur');
          throw 'erreur creation pays';
      }
      }
        
      }

      console.log("********* id_pays "+id_pays);
      var id_ville = await findVilleDevice(_nomVille,id_pays);
        
      if(id_ville==''){
        await ville.create({  
            nomVille: _nomVille,
            PayId:   id_pays
        });
        id_ville = await findVilleDevice(_nomVille,id_pays);
        if(id_ville==''){
            console.log('Creation pays erreur');
            throw 'erreur creation pays';
        }
      }
      
      indexStage++;
      console.log('id_ville : '+id_ville+' id_pays '+id_pays);
    }
    res.send(res);
    /*pays.findOne({ where: {nomPays: 'aProject'} }).then(documents => {
      res.status(200).json(documents);
      //console.log("documents :",documents);
      var i=0;
      for( document in documents){
        console.log("pays :",documents[i].dataValues);
        i++;
      }
      if(i == 0) {
          // Save Book to MySQL database
          pays.create({  
              nomPays: req.body.idStagiaire,
              Nom: req.body.Nom,
              Prenom: req.body.Prenom,
              test: req.body.test
            
          }).then(stagiaire => {
            // Send created book to client
            res.send(stagiaire);
          }).catch(err => {
            res.status(500).send("Error -> " + err);
          })
      }
    });*/
    
  };
/* 
  exports.get = (req, res) => {  
     pays.findAll().then( (result) => res.json(result)  )
    console.log("pays")
    //res.send(result);
  };
 */

  exports.get=(req, res, next) => {
      var document
    pays.findAll().then(documents => {
      res.status(200).json(documents);
      //console.log("documents :",documents);
      var i=0;
      for( document in documents){
        console.log("pays :",documents[i].dataValues);
        i++;
      }
      if(i == 0) {

      }
    }); 
     console.log("document  :",document)
  };















// const Stagiaire = require("../models/stagiaire");
// const mysqlConnection = require('../connexion');

// exports.createStagiaire = function createStagiaire(newStagiaire) {
//     var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
//     CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";

//     var query = mysqlConnection.query(sql, newStagiaire , (err, rows, fields) => {
//         console.log("test query*************** ::", query);
//         newStagiaire
//         .save()
//         .then(createdPost => {
//           res.status(201).json({
//             message: "Post added successfully",
//             newStagiaire: {
//               ...createdPost
//             }
//           });
//         })
//         .catch(error => {
//           res.status(500).json({
//             message: "Creating a post failed!"
//           });
//         });



//      /*    if (!err)
//             rows.forEach(element => {
//                 if (element.constructor == Array) {
//                     // res.send('stagiaire inseré id : '+element[0].idStagiaire);
//                     res.send('stagiaire inseré id');
//                 }
//             });
//         else
//             console.log(err); */
//     });


// }



/* exports.createStagiaire = (req, res) => {
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
} */


/* exports.getStagiaire = (req, res) => {
    mysqlConnection.query('SELECT * FROM stagiaire', (err, rows, fields) => {
        if (!err) {
            //res.send(rows);//affichage des colonnes de la table si pas d'erreur
            res.status(200).json({
                // message: "Nodes fetched successfully!",
                stagiaires: rows

            });
        } else
            console.log(err);
    })
} */
