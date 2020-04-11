DROP SCHEMA IF EXISTS mapicture;
CREATE SCHEMA IF NOT EXISTS mapicture;
USE mapicture;

-- -----------------------------------------------------
-- Table Customers
-- -----------------------------------------------------
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
  id serial PRIMARY KEY auto increment,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(45) NOT NULL unique);
  
CREATE TABLE Signin(
  id         SERIAL PRIMARY KEY auto increment,
  password   varchar(100)   NOT NULL,
  email      VARCHAR(45)    NOT NULL unique);
