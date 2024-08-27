import * as SQLite from 'expo-sqlite';
import data from '../assets/jsonnakshara.json';


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

      CREATE TABLE IF NOT EXISTS MstNAJSGARA (
  NAKSHATRAID INTEGER PRIMARY KEY AUTOINCREMENT,
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

// export const insertRashi = async (rashi) => {
//   await openDatabase();
//   const {
//     RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
//     Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
//   } = rashi;
//   await db.runAsync(`
//     INSERT INTO MstRASHI (
//       RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
//       Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `, [
//     RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
//     Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
//   ]);
// };



export const getAllRashis = async () => {
  await openDatabase();
  const result = await db.getAllAsync('SELECT * FROM MstRASHI;');
  console.log('====================================');
  console.log('Retrieved Rashis');
  console.log('====================================');
  return result;
};


export const getRashiById = async (id) => {
  db = await SQLite.openDatabaseAsync('vTempleVARADA');
  const result = await db.getFirstAsync('SELECT * FROM MstRASHI WHERE RASHIID = ?', [id]);
  console.log('====================================');
  console.log('Retrieved Rashi by ID');
  console.log('====================================');
  return result;
}
export const insertNakshatra = async (nakshatra) => {
  await openDatabase();
  const {
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
    INSERT INTO mstNAJSGARA (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const params = [
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

  const result = await db.executeAsync(query, params);
  console.log('====================================');
  console.log('Inserted Nakshatra');
  console.log('====================================');
  return result;
};

export const getAllNakshatras = async () => {
  const query = 'SELECT * FROM Nakshatras';
  try {
    const result = await db.executeAsync(query);
    return result;
  } catch (error) {
    console.error('Error fetching Nakshatras:', error);
    throw error;
  }
};



// CSVJSON data

// Sample data import

// const formatDate = (dateString) => {
//   if (dateString === "NULL") return new Date().toISOString();
//   return new Date(dateString).toISOString();
// };
// // Process the data
// const updatedData = data.map(item => ({
//   RASHICODE: item.RASHICODE,
//   RASHINAME: item.RASHINAME,
//   RASHISeries: item.RASHISeries,
//   RASHINO: item.RASHINO,
//   InActiveRmks: item.InActiveRmks,
//   InActive: item.InActive,
//   Authorised: item.Authorised,
//   AuthBy: item.AuthBy || 'Admin',
//   AuthOn: formatDate(item.AuthOn),
//   AddedBy: item.AddedBy || 'Admin',
//   AddedOn: formatDate(item.AddedOn),
//   ChangedBy: item.ChangedBy || 'Admin',
//   ChangedOn: formatDate(item.ChangedOn),
//   RashiCodeClean: item.RashiCodeClean
// }));

// // Function to insert the processed data
// const insertProcessedData = async (data) => {
//   for (const item of data) {
//     await insertRashi(item);
//   }
// };

// // Insert the processed data
// insertProcessedData(updatedData)
//   .then(() => console.log('Data inserted successfully'))
//   .catch(error => console.error('Error inserting data:', error));