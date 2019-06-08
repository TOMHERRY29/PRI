
const db = require('../db.config.js');
const Pays = db.pays;


exports.create = (req, res) => {  
    // Save Book to MySQL database
    Pays.create({  
        //idStagiaire: req.body.idStagiaire,
        nomPays: req.body.nomPays, 
        
    }).then(pays => {
      // Send created book to client
      res.send(pays);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  };
