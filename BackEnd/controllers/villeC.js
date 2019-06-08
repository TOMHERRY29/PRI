
const db = require('../db.config.js');
const Ville = db.ville;


exports.create = (req, res) => {  
    // Save Book to MySQL database
    Ville.create({  
        //idStagiaire: req.body.idStagiaire,
        nomVille: req.body.nomVille,
        
    //paysId = parseInt(req.params.paysId)
    }).then(ville => {
      // Send created book to client
      res.send(ville);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  };
