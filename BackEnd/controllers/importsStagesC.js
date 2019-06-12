
const db = require('../db.config.js');
const pays = db.pays;
const ville = db.ville;
const stagiaires = db.stagiaires;
const tuteur = db.tuteur;
const semestre = db.semestre;
const entreprise = db.entreprise;
const stages = db.stage;
const periode = db.periode;
const sequelize = db.sequelize;

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


async function  findStagiareDevice(_nomStagiaire,_prenomStagiaire){
  
  console.log("******************* findStagiareDevice")
  var strid =  await stagiaires.findOne({
      where: {
         NomStagiaire: _nomStagiaire,
         PrenomStagiaire: _prenomStagiaire
      }
   }).then(function(stagiaires) {
      if (stagiaires == null) {
        console.log("Stagiaires introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("stagiaires nomStagiaire : "+_nomStagiaire+" id "+stagiaires.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return stagiaires.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
   return strid;

   
};

async function  findTuteurDevice(_nomTuteur,_prenomTuteur){
  
  console.log("******************* findTuteurDevice")
  var strid =  await tuteur.findOne({
      where: {
         NomTuteur: _nomTuteur,
         PrenomTuteur: _prenomStagiaire
      }
   }).then(function(tuteur) {
      if (tuteur == null) {
        console.log("Stagiaires introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("Tuteur _nomTuteur : "+_nomTuteur+" id "+tuteur.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return tuteur.dataValues.id;
      }
   });
   console.log("**** "+strid);
   //console.log(typeof(strid));
   return strid;

   
};

async function  findSemestreDevice(_libelleSemestre){
  console.log("******************* findPaysDevice")
  var strid =  await semestre.findOne({
      where: {
         libelleSemestre: _libelleSemestre
      }
   }).then(function(semestre) {
      if (semestre == null) {
        console.log("Semestre introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("semestre trouve******************************* "+_libelleSemestre+" semestreID "+semestre.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return semestre.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
   return strid;

   
};

async function  findEntrepriseDevice(_nomEntreprise){
  console.log("******************* findEntrepriseDevice")
  var strid =  await entreprise.findOne({
      where: {
         nomEntreprise: _nomEntreprise
      }
   }).then(function(entreprise) {
      if (entreprise == null) {
        console.log("Entreprise introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("entreprise trouve******************************* "+_nomEntreprise+" semestreID "+entreprise.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return entreprise.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
   return strid;

   
};

async function  findStageDevice(_sujetStage,_addrStage,_soutenanceSemaine,_tuteurId,_stagiareId,_semestreId,_villeId,_entrepriseId){
  
  console.log("******************* findStageDevice")
  var strid =  await stages.findOne({
      where: {
         sujetStage: _sujetStage,
         addrStage: _addrStage,
         soutenanceSemaine: _soutenanceSemaine,
         tuteurId: _tuteurId,
         stagiaireId: _stagiareId,
         semestreId: _semestreId,
         VilleId: _villeId,
         EntrepriseId: _entrepriseId
      }
   }).then(function(stages) {
      if (stages == null) {
        console.log("Stage introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("Stage sujetStage : "+_sujetStage+" id "+stages.dataValues.id)
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return stages.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
   return strid;
};

async function  findPeriod(_stageId,_date_Debut,_date_Fin){
  
  console.log("******************* findStageDevice")
  var strid =  await periode.findOne({
      where: {
        dateDebut: _date_Debut,
        dateFin: _date_Fin,
        stageId: _stageId
      }
   }).then(function(periodes) {
      if (periodes == null) {
        console.log("Periode introuvable");
        
        //idPay='';
        return '';
      }else {
        console.log("Periode trouvée")
        //idPay = idVille;
        //console.log("pays "+pays.idPay);
        return periodes.dataValues.id;
      }
   });
   console.log("**** "+strid);
   console.log(typeof(strid));
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
async function transformDate(_DATES_STAGE){ //Du 16/03/15 au 24/07/15\r\n&\r\ndu 10/08/15 au 28/08/15
  datesPeriodes = [];
  //console.log("DATES STAGE : "+_DATES_STAGE)
  _dates_stage_split = _DATES_STAGE.split(' ');
  for(var index in _dates_stage_split){
      datesPeriod = _dates_stage_split[index]
      //console.log("dates Period : "+datesPeriod);
      datesPeriod = datesPeriod.replace(/  /g, " ");
      //console.log("dates Period suppression espace: "+datesPeriod);
      datesPeriodSplite = datesPeriod.split(' ');
      for(var indexdatesPeriodSplitePart in datesPeriodSplite){
        datesPeriodSplitePart = datesPeriodSplite[indexdatesPeriodSplitePart]
        
        if(datesPeriodSplitePart.length>7 /*&& datesPeriodSplitePart.match(/\//g)==2*/){
        //console.log("splite text match "+datesPeriodSplitePart.match(/\//g).length);
        dateComposant = datesPeriodSplitePart.split('/');
          jour = dateComposant[0];
          mois = dateComposant[1];
          annee =  parseInt(dateComposant[2]).toString();
          if(annee.length == 2){
            var date1 = new Date();
            annee = date1.getFullYear().toString().substring(0,2)+ annee
          }
          dateConcat = annee+'-'+mois+'-'+jour;
          datesPeriodes.push(dateConcat)
        }
      }

  }
  return datesPeriodes;
}

exports.create = async (req, res) => {  
   // console.log("req :");
    //console.log(req.body);
    //console.log("stage");
    //console.log(res)
    console.log("stage");
    var indexStage = 0;
    for (var stage in req.body){
      console.log("stage");
      console.log(req.body[indexStage]);//récupération stage
      _nomVille = req.body[indexStage].nomVille;
      _nomPays = req.body[indexStage].nomPays;
      _nomStagiaire = req.body[indexStage].nomStagiaire;
      _prenomStagiaire = req.body[indexStage].prenomStagiaire;
      //_nomTuteur = req.body[indexStage].
      _libelleSemestre = req.body[indexStage].libelleSemestre;
      _addrStage = req.body[indexStage].addrStage;
      _nomEntreprise = req.body[indexStage].nomEntreprise;
      //_nomEntreprise = 'Atos12';
      _DATES_STAGE = req.body[indexStage].DATES_STAGE;
      _sujetStage = req.body[indexStage].sujetStage;
      _soutenanceSemaine = req.body[indexStage].soutenanceSemaine;
      
      

      //console.log("_nomStagiaire : "+_nomStagiaire+" _prenomStagiaire "+_prenomStagiaire);
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
      console.log('id_ville : '+id_ville+' id_pays '+id_pays);

      // Stagiaire add : findStagiareDevice
      var id_stagiare = await findStagiareDevice(_nomStagiaire,_prenomStagiaire);
      if(id_stagiare==''){
        try{
          await stagiaires.create({  
            NomStagiaire: _nomStagiaire,
            PrenomStagiaire: _prenomStagiaire  
          });
          id_stagiare = await findStagiareDevice(_nomStagiaire,_prenomStagiaire);
        }catch(error ){
          if(id_pays==''){
              console.log('Creation stagiaire erreur');
              throw 'erreur creation stagiaire';
          }
        }
      }
      console.log('stagiaire :'+id_stagiare);
      
      // Stagiaire add : findStagiareDevice
      var id_semestre = await findSemestreDevice(_libelleSemestre);
      if(id_semestre==''){
        try{
          await semestre.create({  
            libelleSemestre: _libelleSemestre
          });
          id_semestre = await findSemestreDevice(_libelleSemestre);
        }catch(error ){
          if(id_semestre==''){
              console.log('Creation Semestre erreur');
              throw 'erreur creation semestre';
          }
        }
      }
      console.log('semestre :'+id_semestre);

      // Stagiaire add : findStagiareDevice
      var id_entreprise = await findEntrepriseDevice(_nomEntreprise);
      if(id_entreprise==''){
        try{
          await entreprise.create({  
            nomEntreprise: _nomEntreprise
          });
          id_entreprise = await findEntrepriseDevice(_nomEntreprise);
        }catch(error ){
          if(id_entreprise==''){
              console.log('Creation Entreprise erreur');
              res.send('erreur');
              throw 'erreur creation entreprise';
          }
        }
      }
      console.log('entreprise : '+id_entreprise);

      var id_tuteur = null;

      var id_stage = await findStageDevice(_sujetStage,_addrStage,_soutenanceSemaine,/*_tuteurId*/null,id_stagiare,id_semestre,id_ville,id_entreprise);
      if(id_stage==''){
        try{
          await stages.create({  
            sujetStage: _sujetStage,
            addrStage: _addrStage,
            soutenanceSemaine: _soutenanceSemaine,
            tuteurId: id_tuteur,
            stagiaireId: id_stagiare,
            semestreId: id_semestre,
            VilleId: id_ville,
            EntrepriseId: id_entreprise,
            periodesStage : _DATES_STAGE
          });
          id_stage = await findStageDevice(_sujetStage,_addrStage,_soutenanceSemaine,/*_tuteurId*/null,id_stagiare,id_semestre,id_ville,id_entreprise);
        }catch(error ){
          if(id_stage==''){
              console.log('Creation Stage erreur'+error);
              res.send('erreur');
              throw 'erreur creation entreprise';
          }
        }
      }
      console.log('stage : '+id_stage);
      dates_list = await transformDate(_DATES_STAGE);
      console.log(dates_list);
      
      for (var indexDate=0;indexDate<dates_list.length;indexDate=indexDate+2) {
        var id_periode = await findPeriod(id_stage,dates_list[indexDate],dates_list[indexDate+1])
        if(id_periode == ''){
          try{
            console.log(id_stage)
            await periode.create({  
              dateDebut: dates_list[indexDate],
              dateFin: dates_list[indexDate+1],
              stageId: id_stage
            });
          }catch(error){
            console.log('Creation date erreur');
            //res.status(500).send('Something broke!');
          }

        }
        id_periode = await findPeriod(id_stage,dates_list[indexDate],dates_list[indexDate+1])
        console.log('id Periode :'+id_periode)
      }

    indexStage++;
    }

   // res.write(JSON.stringify(any,bien: 1,));
    var o = {} // empty Object
    var key = 'Reponse';
    o[key] = []; // empty Array, which you can push() values into


    var data = {
        result: 'Vrai'
    };
    
    res.json(JSON.stringify(data));

};
/* 
  exports.get = (req, res) => {  
     pays.findAll().then( (result) => res.json(result)  )
    console.log("pays")
    //res.send(result);
  };
 */

exports.get=(req, res, next) => {
     
    sequelize.query('select stages.id as idStage,stages.sujetStage,stages.addrStage,stages.soutenanceSemaine,stages.periodesStage,tuteurs.NomTuteur, tuteurs.PrenomTuteur,stagiaires.NomStagiaire,stagiaires.PrenomStagiaire ,semestres.libelleSemestre,villes.nomVille,pays.nomPays,entreprises.nomEntreprise from stages,tuteurs,stagiaires,semestres,villes,pays,entreprises where stages.tuteurId=tuteurs.id and stages.semestreId=semestres.id and stages.EntrepriseId=entreprises.id and stagiaires.id=stages.stagiaireId and stages.VilleId=villes.id and villes.PayId = pays.id UNION select stages.id,stages.sujetStage,stages.addrStage,stages.soutenanceSemaine,stages.periodesStage,\'\' as NomTuteur, \'\' as PrenomTuteur,stagiaires.NomStagiaire,stagiaires.PrenomStagiaire ,semestres.libelleSemestre,villes.nomVille,pays.nomPays,entreprises.nomEntreprise from stages,stagiaires,semestres,villes,pays,entreprises where stages.semestreId=semestres.id and stages.EntrepriseId=entreprises.id and stagiaires.id=stages.stagiaireId and stages.VilleId=villes.id and villes.PayId = pays.id  and stages.tuteurId is NULL;',
      { bind: ['active'], type: sequelize.QueryTypes.SELECT }
    ).then(function(projects) {
      console.log(projects)
      /*res.send(200).json({
        // message: "Nodes fetched successfully!",
        stages: projects
      });*/
      res.status(200).send(JSON.stringify({stages:projects}))
    })
    //console.log("document  :",document);
};


      // Tuteur add : findTuteurDevice
     /* var id_tuteur = await findTuteurDevice(_nomTuteur,_prenomTuteur);
      if(id_stagiare==''){
        try{
          await stagiaires.create({  
            NomStagiaire: _nomStagiaire,
            PrenomStagiaire: _prenomStagiaire  
          });
          id_stagiare = await findStagiareDevice(_nomStagiaire,_prenomStagiaire);
        }catch(error ){
          if(id_pays==''){
              console.log('Creation stagiaire erreur');
              throw 'erreur creation stagiaire';
          }
        }
      }
      console.log('stagiaire :'+id_stagiare);

    }*/

    


    //res.send(res);
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
