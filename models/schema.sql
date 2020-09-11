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
    locationIDs     VARCHAR(256) NOT NULL,
    primary key(id)
);





DROP TABLE IF EXISTS growRooms;

CREATE TABLE growRooms(
	id			            INTEGER auto_increment,
    growroomName	        VARCHAR(128) NOT NULL,
    locationID   	        VARCHAR(256) NOT NULL,
    accountID		        INTEGER NOT NULL,
    serial	                VARCHAR(256) NOT NULL,
    TempSetPoint            VARCHAR(32),
    TempOverAlarm           VARCHAR(32),
    TempUnderAlarm          VARCHAR(32),
    HumidtySetPoint         VARCHAR(32),
    HumidtyOverAlarm        VARCHAR(32),
    HumidtyUnderAlarm       VARCHAR(32),
    CO2SetPoint             VARCHAR(32),
    CO2OverAlarm            VARCHAR(32),
    CO2UnderAlarm           VARCHAR(32),
    pressureSetPoint        VARCHAR(32),
    PressureOverAlarm       VARCHAR(32),
    PressureUnderAlarm      VARCHAR(32),
    StageStartUnixTime      INTEGER,
    StageEndUnixTime        INTEGER,
    CurrentStageName        VARCHAR(32)
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
    temp 					float NOT NULL,
    humidity				float NOT NULL,
    cO2Level				float NOT NULL,
    pressure				float NOT NULL,
    timestamp				INTEGER NOT NULL,
    primary key(id)
);

DROP TABLE IF EXISTS statusMsg;
CREATE TABLE statusMsg(
    id                      INTEGER auto_increment,
    growroomID              INTEGER NOT NULL,
    type                    VARCHAR(32),
    Msg                     VARCHAR(256),
    timestamp               INTEGER,
    primary key(id)               
);
