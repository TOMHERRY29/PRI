const db = require('../db.config.js');
const Stagiaires = db.stagiaires;


/* exports.create = (req, res) => {  
    console.log("insert");
    // Save Book to MySQL database
    Stagiaires.create({  
        idStagiaire: req.body.idStagiaire,
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        test: req.body.test
      
    });
    Stagiaires.save().then(createdNode => {
        // recup data all redady stocked in the db
        res.status(201).json({
          ...createdNode,
          idStage: createdNode.id
        });
        console.log("test 1")
      });
      console.log("test 2")
  }; */




exports.create = (req, res) => {
    console.log("insert");
    // Save Book to MySQL database
    Stagiaires.create({
        idStagiaire: req.body.idStagiaire,
        Nom: req.body.Nom,
        Prenom: req.body.Prenom

    }).then(stagiaire => {
        // Send created book to client
        res.send(stagiaire);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

/*   exports.get = (req, res) => {  
    Stagiaires.findAll().then( (result) => res.json(result) )
    console.log("Stagiares")
    console.log(res); 
    //res.send(result);
  }; */
exports.get = (req, res, next) => {
    Stagiaires.findAll().then(documents => {
        res.status(200).json({
            message: "Nodes fetched successfully!",
            stagiaires:documents});
        //console.log("documents :",documents);
    
    });

};
/*   exports.get=(req, res, next) => {
    var document
    Stagiaires.findAll().then(documents => {
    res.status(200).json(documents);
  }); 
   console.log("document  :",document)
}; */













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
