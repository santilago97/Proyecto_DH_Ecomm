-- MySQL Script generated by MySQL Workbench
-- Fri Jul 10 18:01:58 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sportwear
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sportwear
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sportwear` DEFAULT CHARACTER SET utf8 ;
USE `sportwear` ;

-- -----------------------------------------------------
-- Table `sportwear`.`ROLES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`ROLES` (
  `Id` TINYINT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`USERS` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) NOT NULL,
  `Apellido` VARCHAR(30) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(60) NOT NULL,
  `Avatar` VARCHAR(60) NOT NULL,
  `idRol` TINYINT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_USERS_ROLES_idx` (`idRol` ASC) VISIBLE,
  CONSTRAINT `fk_USERS_ROLES`
    FOREIGN KEY (`idRol`)
    REFERENCES `sportwear`.`ROLES` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`SHOPPING_CART`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`SHOPPING_CART` (
  `idSHOPPING_CART` INT NOT NULL AUTO_INCREMENT,
  `Date` DATETIME NULL,
  `State` TINYINT NULL,
  `Total` INT NULL,
  `USERS_idUSERS` INT NOT NULL,
  PRIMARY KEY (`idSHOPPING_CART`),
  INDEX `fk_SHOPPING_CART_USERS1_idx` (`USERS_idUSERS` ASC) VISIBLE,
  CONSTRAINT `fk_SHOPPING_CART_USERS1`
    FOREIGN KEY (`USERS_idUSERS`)
    REFERENCES `sportwear`.`USERS` (`idUSERS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportwear`.`CATEGORIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`CATEGORIES` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`PRODUCTS` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(200) NOT NULL,
  `Image` VARCHAR(45) NOT NULL,
  `Price` DOUBLE NOT NULL,
  `idCategory` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PRODUCTS_CATEGORIES1_idx` (`idCategory` ASC) VISIBLE,
  CONSTRAINT `fk_PRODUCTS_CATEGORIES1`
    FOREIGN KEY (`idCategory`)
    REFERENCES `sportwear`.`CATEGORIES` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`SIZES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`SIZES` (
  `idSIZE` TINYINT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSIZE`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`TOKENS`
-- -----------------------------------------------------

CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `token` varchar(80) NOT NULL,
  `expiresAt` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)) 
ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `sportwear`.`SHOPPING_CART_has_PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportwear`.`SHOPPING_CART_has_PRODUCTS` (
  `SHOPPING_CART_idSHOPPING_CART` INT NOT NULL,
  `PRODUCTS_idPRODUCTS` INT NOT NULL,
  `Quantity` INT NULL,
  `SIZES_idSIZE` TINYINT NOT NULL,
  PRIMARY KEY (`SHOPPING_CART_idSHOPPING_CART`, `PRODUCTS_idPRODUCTS`),
  INDEX `fk_SHOPPING_CART_has_PRODUCTS_PRODUCTS1_idx` (`PRODUCTS_idPRODUCTS` ASC) VISIBLE,
  INDEX `fk_SHOPPING_CART_has_PRODUCTS_SHOPPING_CART1_idx` (`SHOPPING_CART_idSHOPPING_CART` ASC) VISIBLE,
  INDEX `fk_SHOPPING_CART_has_PRODUCTS_SIZES1_idx` (`SIZES_idSIZE` ASC) VISIBLE,
  CONSTRAINT `fk_SHOPPING_CART_has_PRODUCTS_SHOPPING_CART1`
    FOREIGN KEY (`SHOPPING_CART_idSHOPPING_CART`)
    REFERENCES `sportwear`.`SHOPPING_CART` (`idSHOPPING_CART`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SHOPPING_CART_has_PRODUCTS_PRODUCTS1`
    FOREIGN KEY (`PRODUCTS_idPRODUCTS`)
    REFERENCES `sportwear`.`PRODUCTS` (`idPRODUCTS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SHOPPING_CART_has_PRODUCTS_SIZES1`
    FOREIGN KEY (`SIZES_idSIZE`)
    REFERENCES `sportwear`.`SIZES` (`idSIZE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'root' IDENTIFIED BY 'sportwear';

GRANT ALL ON `sportwear`.* TO 'root';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
