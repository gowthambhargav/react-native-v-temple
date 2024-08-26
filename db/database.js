import * as SQLite from 'expo-sqlite';

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
    `);
  }
};

export const openDatabase = async () => {
  if (!db) {
    await initializeDatabase();
  }
  return db;
};

export const insertRashi = async (rashi) => {
  await openDatabase();
  const {
    RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
    Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
  } = rashi;
  await db.runAsync(`
    INSERT INTO MstRASHI (
      RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
      Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
    Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
  ]);
};

export const getAllRashis = async () => {
  await openDatabase();
  const result = await db.getAllAsync('SELECT * FROM MstRASHI');
  console.log('====================================');
  console.log('Retrieved Rashis:', result);
  console.log('====================================');
  return result;
};

// CSVJSON data
