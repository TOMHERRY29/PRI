DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `StagiaireAjoutOuModification`(IN `_idStagiaire` VARCHAR(60), IN `_Nom` VARCHAR(60), IN `_Prenom` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idStagiaire) FROM stagiaire WHERE idStagiaire = _idStagiaire;
	IF @A = 0 THEN
		INSERT INTO stagiaire(idStagiaire,Nom,Prenom)
        values(_idStagiaire,_Nom,_Prenom);        
	ELSE
		UPDATE Stagiaire SET Nom = _Nom, Prenom = _Prenom WHERE idStagiaire = _idStagiaire;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `VilleAjoutOuModification`(IN `_idVille` VARCHAR(60), IN `_nomVille` VARCHAR(60), IN `_idPays` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idVille) FROM ville WHERE idVille = _idVille;
	IF @A = 0 THEN
		INSERT INTO ville(idVille,nomVille,idPays)
        values(_idVille,_nomVille,_idPays);        
	ELSE
		UPDATE ville SET nomVille = _nomVille, idPays = _idPays WHERE idVille = _idVille;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `tuteurAjoutOuModification`(IN `_idTuteur` VARCHAR(60), IN `_Nom` VARCHAR(60), IN `_Prenom` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idTuteur) FROM tuteur WHERE 	idTuteur = _idTuteur;
	IF @A = 0 THEN
		INSERT INTO tuteur(idTuteur,Nom,Prenom)
        values(_idTuteur,_Nom,_Prenom);        
	ELSE
		UPDATE tuteur SET Nom = _Nom, Prenom = _idPays WHERE idTuteur = _idTuteur;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `stageAjoutOuModification`(IN `_idStage` VARCHAR(60), IN `_sujet` VARCHAR(60), IN `_addr` VARCHAR(60), IN `_soutenanceSemaine` VARCHAR(60), IN  `_idTuteur` VARCHAR(60), IN  `_idStagiaire` VARCHAR(60), IN  `_idSemestre` VARCHAR(60), IN  `_idVille` VARCHAR(60), IN  `_idEntreprise` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idTuteur) FROM stage WHERE 	idTuteur = _idTuteur;
	IF @A = 0 THEN
		INSERT INTO stage(idStage,sujet,addr,soutenanceSemaine,idTuteur,idStagiaire,idSemestre,idVille,idEntreprise)
        values(_idStage,_sujet,_addr,_soutenanceSemaine,_idTuteur,_idStagiaire,_idSemestre,_idVille,_idEntreprise);        
	ELSE
		UPDATE stage SET sujet=_sujet,addr=_addr,soutenanceSemaine=_soutenanceSemaine,idTuteur=_idTuteur,idStagiaire=_idStagiaire,idSemestre=_idSemestre,idVille=_idVille,idEntreprise=_idEntreprise WHERE idStage = _idStage;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `semestreAjoutOuModification`(IN `_idSemestre` VARCHAR(60), IN `_libelle` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idSemestre) FROM semestre WHERE 	idSemestre = _idSemestre;
	IF @A = 0 THEN
		INSERT INTO semestre(idTuteur,libelle)
        values(_idSemestre,_libelle);        
	ELSE
		UPDATE semestre SET libelle = _libelle WHERE idTuteur = _idSemestre;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `piecesjointesAjoutOuModification`(IN `_idPiecesJointes` VARCHAR(60), IN `_titre` VARCHAR(60), IN `_url` VARCHAR(60), IN `_idStage` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idPiecesJointes) FROM piecesjointes WHERE idPiecesJointes = _idPiecesJointes;
	IF @A = 0 THEN
		INSERT INTO piecesjointes(idPiecesJointes,titre,url,idStage)
        values(_idPiecesJointes,_titre,_url,_idStage);        
	ELSE
		UPDATE piecesjointes SET titre = _titre, url = _url, idStage = _idStage WHERE idPiecesJointes = _idSemestre;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `periodeAjoutOuModification`(IN `_idPeriode` VARCHAR(60), IN `_dateDebut` VARCHAR(60), IN `_dateFin` VARCHAR(60), IN `_idStage` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idPeriode) FROM periode WHERE idPeriode = _idPeriode;
	IF @A = 0 THEN
		INSERT INTO periode(idPeriode,dateDebut,dateFin,idStage)
        values(_idPeriode,_dateDebut,_dateFin,_idStage);        
	ELSE
		UPDATE periode SET dateDebut=_dateDebut, dateFin=_dateFin, idStage=_idStage WHERE idPeriode = _idPeriode;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `paysAjoutOuModification`(IN `_idPays` VARCHAR(60), IN `_nomPays` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idPeriode) FROM pays WHERE idPays = _idPays;
	IF @A = 0 THEN
		INSERT INTO pays(idPays, nomPays)
        values(_idPays, _nomPays);        
	ELSE
		UPDATE pays SET nomPays = _nomPays WHERE idPays = _idPays;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `entrepriseAjoutOuModification`(IN `_idEntreprise` VARCHAR(60), IN `_nomEntreprise` VARCHAR(60))
    NO SQL
BEGIN
SELECT @A := COUNT(idEntreprise) FROM entreprise WHERE idEntreprise = _idEntreprise;
	IF @A = 0 THEN
		INSERT INTO entreprise(idEntreprise, nomEntreprise)
        values(_idEntreprise, _nomEntreprise);        
	ELSE
		UPDATE entreprise SET nomEntreprise = _nomEntreprise WHERE idEntreprise = _idEntreprise;
	END IF;
END$$
DELIMITER ;