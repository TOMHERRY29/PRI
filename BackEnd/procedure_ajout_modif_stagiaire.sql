CREATE DEFINER=`root`@`localhost` PROCEDURE `StagiaireAjoutOuModification`(
IN _idStagiaire varchar(60),
IN _Nom varchar(60),
IN _Prenom varchar(60)
)
BEGIN
	SELECT @A := COUNT(idStagiaire) FROM stagiaire WHERE idStagiaire = _idStagiaire;
	IF @A = 0 THEN
		INSERT INTO stagiaire(idStagiaire,Nom,Prenom)
        values(_idStagiaire,_Nom,_Prenom);        
	ELSE
		UPDATE Stagiaire SET Nom = _Nom, Prenom = _Prenom WHERE idStagiaire = _idStagiaire;
	END IF;
    
END