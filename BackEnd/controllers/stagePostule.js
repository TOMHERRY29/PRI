
const db = require('../db.config.js');
const stagePostuler = db.stagePostuler;
const tuteur = db.tuteur;
const sequelize = db.sequelize;
const stage = db.stage;

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

exports.getStageNonAffecterValidation=(req, res, next) => {
  sequelize.query('select stages.id,stages.sujetStage,stages.addrStage,stages.soutenanceSemaine,stages.periodesStage,tuteurs.NomTuteur, tuteurs.PrenomTuteur,stagiaires.NomStagiaire,stagiaires.PrenomStagiaire ,semestres.libelleSemestre,villes.nomVille,pays.nomPays,entreprises.nomEntreprise,semestres.libelleSemestre,stagepostulers.commentaire,stgpost.nmbreStage,stgpost.tuteurId from stages,stagiaires,semestres,villes,pays,entreprises,tuteurs,stagepostulers,(SELECT count(*) as nmbreStage, stagepostulers.tuteurId FROM stagepostulers GROUP BY tuteurId) as stgpost where stages.semestreId=semestres.id and stages.EntrepriseId=entreprises.id and stagiaires.id=stages.stagiaireId and stages.VilleId=villes.id and villes.PayId = pays.id and stages.tuteurId is NULL and stagepostulers.tuteurId = tuteurs.id and stagepostulers.stageId = stages.id and stgpost.tuteurId = tuteurs.id ORDER BY stages.id;',
    { bind: ['active'], type: sequelize.QueryTypes.SELECT }
  ).then(function(projects) {
    var o = [] // empty Object
    var indexProject = 0;
    var lastId = "";
    var tuteurs = [];
    var data = {};
    for(var project in projects)
    {
      console.log("project "+projects[indexProject].id)
      console.log(lastId)
      if(lastId != "" && lastId == projects[indexProject].idStage){
        tuteurs.push({
          "id":projects[indexProject].tuteurId,
          "nom":projects[indexProject].NomTuteur,
          "prenom":projects[indexProject].PrenomTuteur,
          "Commentaire":projects[indexProject].commentaire,
          "checked":false,
          "numberOfStage":projects[indexProject].nmbreStage
        })
        data = {
          "id": projects[indexProject].id,
          "nom": projects[indexProject].NomStagiaire,
          "prenom": projects[indexProject].PrenomStagiaire,
          "sujet": projects[indexProject].sujetStage,
          "Name":"name",
          "checked":false,
          "semestre":projects[indexProject].libelleSemestre,
          "tuteur":tuteurs
        };
      }else{
          if(indexProject != 0){
            console.log("lastId")
            
            o.push(data);
          }
          tuteurs = [{
          "id":projects[indexProject].tuteurId,
          "nom":projects[indexProject].NomTuteur,
          "prenom":projects[indexProject].PrenomTuteur,
          "Commentaire":projects[indexProject].commentaire,
          "checked":false,
          "numberOfStage":projects[indexProject].nmbreStage
          }];
          data = {
              "id": projects[indexProject].id,
              "nom": projects[indexProject].NomStagiaire,
              "prenom": projects[indexProject].PrenomStagiaire,
              "sujet": projects[indexProject].sujetStage,
              "Name":"name",
              "checked":false,
              "semestre":projects[indexProject].libelleSemestre,
              "tuteur":tuteurs
          };
      }
      
      lastId = projects[indexProject].id;
      indexProject++;
    }
    o.push(data);
    console.log(JSON.stringify({campagnes:projects}))
    res.status(200).send(JSON.stringify({campagnes:projects}))
  })
};

exports.postStageNonAffecterValidation=(req, res, next) => {
  _idStage = req.body.idStage;
  _idTuteur = req.body.idTuteur;
  console.log("_idStage "+_idStage+" _idTuteur "+_idTuteur)
  /*stage.update({ tuteurid: _idTuteur }, 
  { where: { id: _idStage }})*/
  sequelize.query("UPDATE `stages` SET `tuteurid`='"+_idTuteur+"' where `id`='"+_idStage+"' ");
  res.status(200).send(JSON.stringify({"result":"Vrai"}));
};

