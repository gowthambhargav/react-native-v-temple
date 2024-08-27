import * as SQLite from 'expo-sqlite';
import dataNakshara from '../assets/jsonnakshara.json';
import dataRashi from '../assets/csvjson.json';
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
    `);
  }
};

export const openDatabase = async () => {
  if (!db) {
    await initializeDatabase();
  }
  return db;
};

export const insertNakshatra = async (nakshatra) => {
  await openDatabase();
  const {
    NAKSHATRAID,
    NAKSHATRACODE,
    NAKSHATRANAME,
    NAKSHATRACodeClean,
    NAKSHATRASeries,
    NAKSHATRANO,
    InActiveRmks,
    InActive,
    Authorised,
    AuthBy,
    AuthOn,
    AddedBy,
    AddedOn,
    ChangedBy,
    ChangedOn,
    RASHIID1,
    RASHIID2
  } = nakshatra;

  const query = `
    INSERT INTO MstNAKSHATRA (
      NAKSHATRAID,
      NAKSHATRACODE,
      NAKSHATRANAME,
      NAKSHATRACodeClean,
      NAKSHATRASeries,
      NAKSHATRANO,
      InActiveRmks,
      InActive,
      Authorised,
      AuthBy,
      AuthOn,
      AddedBy,
      AddedOn,
      ChangedBy,
      ChangedOn,
      RASHIID1,
      RASHIID2
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const params = [
    NAKSHATRAID,
    NAKSHATRACODE,
    NAKSHATRANAME,
    NAKSHATRACodeClean,
    NAKSHATRASeries,
    NAKSHATRANO,
    InActiveRmks,
    InActive,
    Authorised,
    AuthBy,
    AuthOn,
    AddedBy,
    AddedOn,
    ChangedBy,
    ChangedOn,
    RASHIID1,
    RASHIID2
  ];

  const result = await db.runAsync(query, params);
  console.log('====================================');
  console.log('Inserted Nakshatra');
  console.log('====================================');
  return result;
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
    console.log('====================================');
    console.log('Rashis:', result);
    console.log('====================================');
    return result;
  } catch (error) {
    console.error('Error fetching Rashis:', error);
    throw error;
  }
};

// CSVJSON data

// Sample data import
const formatDate = (dateString) => {
  if (dateString === "NULL") {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return new Date(dateString).toISOString();
};

// Process the data
