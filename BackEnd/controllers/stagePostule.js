
const db = require('../db.config.js');
const stagePostuler = db.stagePostuler;
const sequelize = db.sequelize;




exports.create = async (req, res) => {  
    // console.log("req :");
    //console.log(req.body);
    //console.log("stage");
    //console.log(res)
    console.log("stage Postule compagne");
    var indexStage = 0;
    for (var stagePostuler in req.body){
      _idStage = req.body[indexStage].idStage;
      _idTureur = req.body[indexStage].idTureur;
      _message = req.body[indexStage].message;
      _etat ='Vrai'
        try{
            await stagePostuler.create({  
            stageId: _idStage,
            tuteurId: _idTureur,
            message: _message,  
          });
          
        }catch(error ){
          _etat ='False'
          console.log('Erreur affectation stage id '+_idStage+' au tuteur id '+_idTureur);
          throw 'erreur Affectation'+error;
        }
      }
      

   // res.write(JSON.stringify(any,bien: 1,));
    var o = {} // empty Object
    var key = 'Reponse';
    o[key] = []; // empty Array, which you can push() values into


    var data = {
        result: _etat
    };
    
    res.json(JSON.stringify(data));

};


exports.getStageNonPostuler=(req, res, next) => {
    sequelize.query('select stages.id,stages.sujetStage,stages.addrStage,stages.soutenanceSemaine,stages.periodesStage,\'\' as NomTuteur, \'\' as PrenomTuteur,stagiaires.NomStagiaire,stagiaires.PrenomStagiaire ,semestres.libelleSemestre,villes.nomVille,pays.nomPays,entreprises.nomEntreprise from stages,stagiaires,semestres,villes,pays,entreprises where stages.semestreId=semestres.id and stages.EntrepriseId=entreprises.id and stagiaires.id=stages.stagiaireId and stages.VilleId=villes.id and villes.PayId = pays.id;',
      { bind: ['active'], type: sequelize.QueryTypes.SELECT }
    ).then(function(projects) {
      console.log(projects)
      
      res.status(200).send(JSON.stringify({stages:projects}))
    })
};


