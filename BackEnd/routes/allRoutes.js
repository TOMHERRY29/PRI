/* const express = require("express");
const StagiaireController = require("../controllers/stagaires");
const router = express.Router();
 const Stagiaire = require("../models/stagiaire");
const mysqlConnection = require('../connexion');
 */
module.exports = function (app) {
    
/* import controlleur */
    const stagiaires = require('../controllers/stagaires.js');
    const pays = require('../controllers/paysC');
    const ville = require('../controllers/villeC');
    const importStagesC = require('../controllers/importsStagesC');
    const globalStage = require('../controllers/globalStageC');
    const stats = require('../controllers/stats');
    const stagePostule = require('../controllers/stagePostule');

    app.post("/stagiaires", stagiaires.create);
    app.get("/stagiaires", stagiaires.get);
    
    app.post("/pays", pays.create);
    app.post("/ville", ville.create);

    app.post("/importStages", importStagesC.create);
    app.get("/importStages", importStagesC.get);
    // app.get("/importStagesA", importStagesC.getA);
    app.get("/getNombreStagesMonde",importStagesC.getNombreStagesMonde);
    app.get("/getEnibiensParPays",importStagesC.getEnibiensParPays);

    /* get & post de globalStage */
    app.post("/globalStage", globalStage.create);
    app.get("/globalStage", globalStage.get);
    
    /*** stats Administrateurs ***/
    app.get("/statsStageSuivi",stats.getStageSuivi);
    app.get("/statsStageTuteurCompte",stats.getStageTuteurCompte);

    /*** Compagne ***/
    app.post("/stageCompagne", stagePostule.create);
    app.get("/stageCompagneNonPostule", stagePostule.create);

}























// router.post("", function (req, res) {

//     var newStagiaire = { 'idStagiaire': req.body.idStagiaire, 'Nom': req.body.Nom,'Prenom': req.body.Prenom }
//    /*  newStagiaire = Stagiaire.create({
//         idStagiaire,
//         Nom,
//         Prenom
//     }) */
//     let stud = req.body;
//     var sql = "SET @idStagiaire = ?;SET @Nom = ?;SET @Prenom = ?; \
//     CALL StagiaireAjoutOuModification(@idStagiaire,@Nom,@Prenom);";

//     var query = mysqlConnection.query(sql, [stud.idStagiaire, stud.Nom, stud.Prenom] , (err, rows, fields) => {
//    /*      console.log(query);
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
//  */


//         if (!err)
//             rows.forEach(element => {
//                 if (element.constructor == Array) {
//                     // res.send('stagiaire inseré id : '+element[0].idStagiaire);
//                     res.send('stagiaire inseré id');
//                 }
//             });
//         else
//             console.log(err);
//     });





// });


/* router.post("", function (req, res) {
    var obj=  {
        idStagiaire: req.body.idStagiaire,
        Nom:req.body.Nom,
        Prenom: req.body.Prenom  
    };
    Stagiaire.StagiaireController.createStagiaire(obj);
    //res.redirect("/");
});
 */

//router.post("", StagiaireController.createStagiaire);
/* router.get("", StagiaireController.getStagiaire);

module.exports = router; */
