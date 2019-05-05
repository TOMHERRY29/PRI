-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 01 mai 2019 à 14:52
-- Version du serveur :  10.1.37-MariaDB
-- Version de PHP :  7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gst`
--
CREATE DATABASE IF NOT EXISTS `gst` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `gst`;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `idEntreprise` varchar(60) NOT NULL,
  `nomEntreprise` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`idEntreprise`, `nomEntreprise`) VALUES
('ENT_ATOS', 'ATOS'),
('ENT_SOPRASTERIA', 'SOPRA STERIA');

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `idPays` varchar(60) NOT NULL,
  `nomPays` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`idPays`, `nomPays`) VALUES
('FR', 'FRANCE'),
('MAR', 'MAROC');

-- --------------------------------------------------------

--
-- Structure de la table `periode`
--

CREATE TABLE `periode` (
  `idPeriode` int(11) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `idStage` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `piecesjointes`
--

CREATE TABLE `piecesjointes` (
  `idPiecesJointes` varchar(60) NOT NULL,
  `titre` varchar(60) NOT NULL,
  `url` varchar(60) NOT NULL,
  `idStage` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `semestre`
--

CREATE TABLE `semestre` (
  `idSemestre` varchar(60) NOT NULL,
  `libelle` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `semestre`
--

INSERT INTO `semestre` (`idSemestre`, `libelle`) VALUES
('S08', 'Semestre 8'),
('S10', 'Semestre 10');

-- --------------------------------------------------------

--
-- Structure de la table `stage`
--

CREATE TABLE `stage` (
  `idStage` varchar(60) NOT NULL,
  `sujet` varchar(60) NOT NULL,
  `addr` varchar(60) NOT NULL,
  `soutenanceSemaine` int(11) NOT NULL,
  `idTuteur` varchar(60) NOT NULL,
  `idStagiaire` varchar(60) NOT NULL,
  `idSemestre` varchar(60) NOT NULL,
  `idVille` varchar(60) NOT NULL,
  `idEntreprise` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `stagiaire`
--

CREATE TABLE `stagiaire` (
  `idStagiaire` varchar(60) NOT NULL,
  `Nom` varchar(60) NOT NULL,
  `Prenom` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `stagiaire`
--

INSERT INTO `stagiaire` (`idStagiaire`, `Nom`, `Prenom`) VALUES
('h6rafaa', 'RAFAA', 'Hamza'),
('y6lassir', 'LASSIRI', 'Yahya');

-- --------------------------------------------------------

--
-- Structure de la table `tuteur`
--

CREATE TABLE `tuteur` (
  `idTuteur` varchar(60) NOT NULL,
  `Nom` varchar(60) NOT NULL,
  `Prenom` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tuteur`
--

INSERT INTO `tuteur` (`idTuteur`, `Nom`, `Prenom`) VALUES
('HOROQUARTZ_ROSELIER_BRICE', 'ROSELIER', 'BRICE'),
('SOPRASTERIA_CHAMO_LEO', 'CHAMO', 'LEO');

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `idVille` varchar(60) NOT NULL,
  `nomVille` varchar(60) NOT NULL,
  `idPays` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`idVille`, `nomVille`, `idPays`) VALUES
('FR_BREST', 'BREST', 'FR'),
('FR_NANTES', 'NANTES', 'FR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`idEntreprise`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`idPays`);

--
-- Index pour la table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`idPeriode`),
  ADD KEY `ForeignKey_idStage_periode` (`idStage`);

--
-- Index pour la table `piecesjointes`
--
ALTER TABLE `piecesjointes`
  ADD PRIMARY KEY (`idPiecesJointes`),
  ADD KEY `ForeignKey_idStage` (`idStage`);

--
-- Index pour la table `semestre`
--
ALTER TABLE `semestre`
  ADD PRIMARY KEY (`idSemestre`);

--
-- Index pour la table `stage`
--
ALTER TABLE `stage`
  ADD PRIMARY KEY (`idStage`),
  ADD KEY `ForeignKey_idTuteur` (`idTuteur`),
  ADD KEY `ForeignKey_idStagiaire` (`idStagiaire`),
  ADD KEY `ForeignKey_idVille` (`idVille`),
  ADD KEY `ForeignKey_idEntreprise` (`idEntreprise`),
  ADD KEY `ForeignKey_idSemestre` (`idSemestre`);

--
-- Index pour la table `stagiaire`
--
ALTER TABLE `stagiaire`
  ADD PRIMARY KEY (`idStagiaire`);

--
-- Index pour la table `tuteur`
--
ALTER TABLE `tuteur`
  ADD PRIMARY KEY (`idTuteur`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`idVille`),
  ADD KEY `ForeignKey_idPays` (`idPays`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `periode`
--
ALTER TABLE `periode`
  ADD CONSTRAINT `ForeignKey_idStage_periode` FOREIGN KEY (`idStage`) REFERENCES `stage` (`idStage`);

--
-- Contraintes pour la table `piecesjointes`
--
ALTER TABLE `piecesjointes`
  ADD CONSTRAINT `ForeignKey_idStage` FOREIGN KEY (`idStage`) REFERENCES `stage` (`idStage`);

--
-- Contraintes pour la table `stage`
--
ALTER TABLE `stage`
  ADD CONSTRAINT `ForeignKey_idEntreprise` FOREIGN KEY (`idEntreprise`) REFERENCES `entreprise` (`idEntreprise`),
  ADD CONSTRAINT `ForeignKey_idSemestre` FOREIGN KEY (`idSemestre`) REFERENCES `semestre` (`idSemestre`),
  ADD CONSTRAINT `ForeignKey_idStagiaire` FOREIGN KEY (`idStagiaire`) REFERENCES `stagiaire` (`idStagiaire`),
  ADD CONSTRAINT `ForeignKey_idTuteur` FOREIGN KEY (`idTuteur`) REFERENCES `tuteur` (`idTuteur`),
  ADD CONSTRAINT `ForeignKey_idVille` FOREIGN KEY (`idVille`) REFERENCES `ville` (`idVille`);

--
-- Contraintes pour la table `ville`
--
ALTER TABLE `ville`
  ADD CONSTRAINT `ForeignKey_idPays` FOREIGN KEY (`idPays`) REFERENCES `pays` (`idPays`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
