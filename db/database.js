import * as SQLite from 'expo-sqlite';
import dataNakshara from '../assets/jsonnakshara.json';
import dataRashi from '../assets/csvjson.json';
import dataGothra from '../assets/gothra.json';
import dataSVA from '../assets/seva.json';
import dataSannidhi from '../assets/sannidhi.json';
import dataComp from '../assets/mstcom.json';
var db;

const initializeDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('vTempleVARADA');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
    
      CREATE TABLE IF NOT EXISTS MstRASHI (
        RASHIID INTEGER PRIMARY KEY AUTOINCREMENT,
        RASHICODE VARCHAR(50),
        RASHINAME VARCHAR(250),
        RASHISeries VARCHAR(10),
        RASHINO NUMERIC(18, 0),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME,
        RashiCodeClean VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS MstNAKSHATRA (
        NAKSHATRAID INTEGER PRIMARY KEY,
        NAKSHATRACODE VARCHAR(50) NOT NULL,
        NAKSHATRANAME VARCHAR(250) NOT NULL,
        NAKSHATRACodeClean VARCHAR(50) NOT NULL,
        NAKSHATRASeries VARCHAR(10),
        NAKSHATRANO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME NOT NULL,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME NOT NULL,
        RASHIID1 INTEGER NOT NULL,
        RASHIID2 INTEGER NOT NULL
      );

    CREATE TABLE IF NOT EXISTS MstGOTHRA (
  GOTHRAID INTEGER PRIMARY KEY,
  GOTHRACODE VARCHAR(50) NOT NULL,
  GOTHRANAME VARCHAR(250) NOT NULL,
  GOTHRACodeClean VARCHAR(50) NOT NULL,
  GOTHRASeries VARCHAR(10),
  GOTHRANO NUMERIC(19, 2),
  InActiveRmks VARCHAR(250),
  InActive CHAR(1),
  Authorised CHAR(1),
  AuthBy VARCHAR(50),
  AuthOn DATETIME NOT NULL,
  AddedBy VARCHAR(50),
  AddedOn DATETIME,
  ChangedBy VARCHAR(50),
  ChangedOn DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS MstSVA (
  SVAID INTEGER PRIMARY KEY,
  SVACODE VARCHAR(250) NOT NULL,
  SVANAME VARCHAR(250) NOT NULL,
  SVACodeClean VARCHAR(250) NOT NULL,
  SVASeries VARCHAR(10),
  SVANO NUMERIC(19, 2),
  InActiveRmks VARCHAR(250),
  InActive CHAR(1),
  Authorised CHAR(1),
  AuthBy VARCHAR(50),
  AuthOn DATETIME NOT NULL,
  AddedBy VARCHAR(50),
  AddedOn DATETIME,
  ChangedBy VARCHAR(50),
  ChangedOn DATETIME NOT NULL,
  AMT NUMERIC(19, 2) NOT NULL,
  RMKS VARCHAR(250) NOT NULL,
  RMKS_XML TEXT,
  SEVAINKAN NVARCHAR(250) NOT NULL,
  SVADISPNAME VARCHAR(250) NOT NULL
);


        CREATE TABLE IF NOT EXISTS MstSANNIDHI (
        SANNIDHIID INTEGER PRIMARY KEY,
        SANNIDHICODE VARCHAR(50) NOT NULL,
        SANNIDHINAME VARCHAR(250) NOT NULL,
        SANNIDHICodeClean VARCHAR(250) NOT NULL,
        SANNIDHISeries VARCHAR(10),
        SANNIDHINO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME NOT NULL,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME NOT NULL
      );
 CREATE TABLE IF NOT EXISTS TrnHdrSEVA (
        SEVAID INTEGER PRIMARY KEY,
        SEVANO VARCHAR(12),
        Prefix VARCHAR(3),
        PrintSEVANO VARCHAR(50),
        SEVADate DATETIME,
        SEVADateYear INTEGER NOT NULL,
        SEVADateMonth INTEGER NOT NULL,
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME NOT NULL,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME NOT NULL,
        Cancelled CHAR(1),
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        SANNIDHIID INTEGER NOT NULL,
        RMKS VARCHAR(250) NOT NULL,
        CHQNO VARCHAR(250) NOT NULL,
        CHQDATE SMALLDATETIME NOT NULL,
        SevaRate NUMERIC(19, 2) NOT NULL,
        NoOfdays INTEGER NOT NULL,
        TotalAmt NUMERIC(19, 2) NOT NULL,
        Add1 VARCHAR(250) NOT NULL,
        Add2 VARCHAR(250) NOT NULL,
        Add3 VARCHAR(250) NOT NULL,
        Add4 VARCHAR(250) NOT NULL,
        AMTINWRDS VARCHAR(250) NOT NULL,
        RegularD CHAR(1) NOT NULL,
        DaysPrintText VARCHAR(250) NOT NULL,
        KNAME VARCHAR(500) NOT NULL,
        SECKNAME VARCHAR(250) NOT NULL,
        NAKSHATRAID INTEGER NOT NULL,
        SECNAKSHATRAID INTEGER NOT NULL,
        GOTHRAID INTEGER NOT NULL,
        BANKNAME VARCHAR(100) NOT NULL,
        PAYMENT VARCHAR(50) NOT NULL,
        SVAID INTEGER NOT NULL,
        MOBNUM VARCHAR(50) NOT NULL,
        REFNO VARCHAR(10) NOT NULL,
        ADDRES VARCHAR(250) NOT NULL,
        ISSUEDBY VARCHAR(10) NOT NULL,
        GRPSEVAID INTEGER NOT NULL,
        NAMEINKAN NVARCHAR(150) NOT NULL,
        MOBNO VARCHAR(50) NOT NULL,
        PRASADA VARCHAR(10) NOT NULL,
        RASHIID INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS MstComp (
  CompID INTEGER PRIMARY KEY,
  CompName VARCHAR(250),
  Address1 VARCHAR(100) NOT NULL,
  Address2 VARCHAR(100) NOT NULL,
  Address3 VARCHAR(100) NOT NULL,
  Address4 VARCHAR(100) NOT NULL,
  Address5 VARCHAR(100) NOT NULL,
  JpgFile BLOB NOT NULL,
  Custcode VARCHAR(50) NOT NULL,
  EMAIL VARCHAR(100) NOT NULL,
  MOBNO VARCHAR(30) NOT NULL,
  PANNO VARCHAR(10) NOT NULL,
  WEB VARCHAR(50) NOT NULL,
  GSTNO VARCHAR(15) NOT NULL,
  CompLoc VARCHAR(50),
  CINNO VARCHAR(50) NOT NULL,
  TELNO VARCHAR(50) NOT NULL,
  DashBoardLink VARCHAR(500) NOT NULL
);
    `);
  }
};

export const openDatabase = async () => {
  if (!db) {
    await initializeDatabase();
  }
  return db;
};

export const getAllNakshatras = async () => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const query = 'SELECT * FROM MstNAKSHATRA';
  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error('Error fetching Nakshatras:', error);
    throw error;
  }
};

export const getAllRashis = async () => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const query = 'SELECT * FROM MstRASHI';
  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error('Error fetching Rashis:', error);
    throw error;
  }
};

export const getAllGothras = async () => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const query = 'SELECT * FROM MstGOTHRA';
  try {
    const result = await db.getAllAsync(query);
    console.log('====================================');
    console.log('Gothras: From Database.js');
    console.log('====================================');
    return result;
  } catch (error) {
    console.error('Error fetching Gothras:', error);
    throw error;
  }
};

export const GetAllSVA = async () => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const query = 'SELECT * FROM MstSVA';
  try {
    const result = await db.getAllAsync(query);
    console.log('====================================');
    console.log('Seva: From Database.js');
    console.log('====================================');
    return result;
  } catch (error) {
    console.error('Error fetching Seva:', error);
    throw error;
  }
}
export const GetAllSannidhi = async () => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const query = 'SELECT * FROM MstSANNIDHI';
  try {
    const result = await db.getAllAsync(query);
    console.log('====================================');
    console.log('Sannidhi: From Database.js');
    console.log('====================================');
    return result;
  } catch (error) {
    console.error('Error fetching Sannidhi:', error);
    throw error;
  }
}

// inseting data into  table
