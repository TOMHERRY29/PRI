const db = require('../db.config.js');
const sequelize = db.sequelize;


exports.getStageSuivi=(req, res, next) => {
     
    sequelize.query('select stagesA.countA as stageA, stagesN.countN as stageNA FROM (select count(`id`) as countA from `stages` WHERE `tuteurId` is not NULL) as stagesA, (select count(`id`) as countN from `stages` WHERE `tuteurId` is NULL) as stagesN;',
      { bind: ['active'], type: sequelize.QueryTypes.SELECT }
    ).then(function(projects) {
      console.log(projects)
      /*res.send(200).json({
        // message: "Nodes fetched successfully!",
        stages: projects
      });*/
      res.status(200).send(JSON.stringify({tuteurs:projects}))
    })
    //console.log("document  :",document);
};

exports.getStageTuteurCompte=(req, res, next) => {
     
  sequelize.query('SELECT `NomTuteur`,`PrenomTuteur`,cont.nmbrStages FROM `tuteurs`,(SELECT tuteurId, count(`tuteurId`) as nmbrStages FROM `stages` where `tuteurId` is not NULL group by `tuteurId`) as cont WHERE cont.tuteurId = tuteurs.id',
    { bind: ['active'], type: sequelize.QueryTypes.SELECT }
  ).then(function(projects) {
    console.log(projects)
    /*res.send(200).json({
      // message: "Nodes fetched successfully!",
      stages: projects
    });*/
    res.status(200).send(JSON.stringify({tuteurs:projects}))
  })
  //console.log("document  :",document);
};