DROP DATABASE IF EXISTS agromation_growRoom;

CREATE DATABASE agromation_growRoom;

USE agromation_growRoom;

DROP TABLE IF exists users;

CREATE TABLE users(
	id 				INTEGER auto_increment,
    fullName		VARCHAR(128) NOT NULL,
    companyName		VARCHAR(128),
    email			VARCHAR(128) NOT NULL,
    password		VARCHAR(256) NOT NULL,
    createdOn		VARCHAR(12)  NOT NULL,
    accountID		integer,
    primary key(id)
);

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
	id   INTEGER auto_increment,
    accountOnwer    INTEGER NOT NULL,
    users			VARCHAR(256),
    growroomIDs		VARCHAR(256) NOT NULL,
    primary key(id)
);





DROP TABLE IF EXISTS growRooms;

CREATE TABLE growRooms(
	id			    INTEGER auto_increment,
    growroomName	VARCHAR(128) NOT NULL,
    location   	    VARCHAR(256) NOT NULL,
    ownerID		    INTEGER NOT NULL,
    accountId	    Integer,
    serial	        VARCHAR(256) NOT NULL,
    setPoint        VARCHAR(32),
    overAlarm       VARCHAR(32),
    underAlarm      VARCHAR(32),
    firstStartTime  INTEGER,
    lastStartTime   INTEGER,
    totalRunTime    INTEGER,
    running			boolean,
    statusMsg		VARCHAR(256),
    primary key     (id)
    );

DROP TABLE IF EXISTS growRoomData;
CREATE TABLE growRoomData(
	id						INTEGER auto_increment,
    growroomID				INTEGER NOT NULL,
    temp1 					float NOT NULL,
    temp2					float NOT NULL,
    temp3					float NOT NULL,
    ambientTemp				float NOT NULL,
    humidity				float NOT NULL,
    timestamp				INTEGER NOT NULL,
    primary key(id)
);
