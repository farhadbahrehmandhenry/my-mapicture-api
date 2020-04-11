DROP SCHEMA IF EXISTS mapicture;
CREATE SCHEMA IF NOT EXISTS mapicture;
USE mapicture;

CREATE TABLE Users(
  id serial PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(45) NOT NULL unique);
  
CREATE TABLE Signin(
  id         SERIAL PRIMARY KEY,
  password   varchar(100)   NOT NULL,
  email      VARCHAR(45)    NOT NULL unique);
