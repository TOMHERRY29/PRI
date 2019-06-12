
const db = require('../db.config.js');
const stagePostuler = db.stagePostuler;
const tuteur = db.tuteur;
const sequelize = db.sequelize;

async function  findTuteursDevice(_mail){
  
  console.log("******************* findTuteur")
  var strid =  await tuteur.findOne({
      where: {
         mail: _mail
      }
   }).then(function(tuteurs) {
      if (tuteurs == null) {
        console.log("tuteur indisponnible");
        
        //idPay='';
        return '';
      } else {
        console.log("tuteur trouve******************************* "+tuteurs.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return tuteurs.dataValues.id;
      }
   });
   console.log("**** tuteur id "+strid);
   console.log(typeof(strid));
   return strid;

   
};


exports.create = async (req, res) => {  
    // console.log("req :");
    //console.log(req.body);
    //console.log("stage");
    //console.log(res)
    console.log("stage Postule compagne"+req.body);
    
    var indexStage = 0;
    for (var stagePostul in req.body){
      _idStage = req.body[indexStage].idStage;
      _mailTureur = req.body[indexStage].mail;
      _message = req.body[indexStage].commentaire;
      console.log("message :"+_message);
      _idTuteur = await findTuteursDevice(_mailTureur);
        try{
            await stagePostuler.create({  
            stageId: _idStage,
            tuteurId: _idTuteur,
            commentaire: _message  
          });
          
        }catch(error ){
          
          console.log('Erreur affectation stage id '+_idStage+' au tuteur id '+_idTuteur);
          //throw 'erreur Affectation'+error;
        }
        indexStage++;
      }
      

   // res.write(JSON.stringify(any,bien: 1,));
    var o = {} // empty Object
    var key = 'Reponse';
    o[key] = []; // empty Array, which you can push() values into

    var data = {
        result: "Vrai"
    };
    
    res.json(JSON.stringify(data));

};


exports.getStageNonAffecter=(req, res, next) => {
    sequelize.query('select stages.id,stages.sujetStage,stages.addrStage,stages.soutenanceSemaine,stages.periodesStage,\'\' as NomTuteur, \'\' as PrenomTuteur,stagiaires.NomStagiaire,stagiaires.PrenomStagiaire ,semestres.libelleSemestre,villes.nomVille,pays.nomPays,entreprises.nomEntreprise,semestres.libelleSemestre from stages,stagiaires,semestres,villes,pays,entreprises where stages.semestreId=semestres.id and stages.EntrepriseId=entreprises.id and stagiaires.id=stages.stagiaireId and stages.VilleId=villes.id and villes.PayId = pays.id and stages.tuteurId is NULL;',
      { bind: ['active'], type: sequelize.QueryTypes.SELECT }
    ).then(function(projects) {
      console.log(projects)
      
      res.status(200).send(JSON.stringify({campagnes:projects}))
    })
};


