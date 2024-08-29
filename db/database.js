import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sqlDataRashi from "../assets/csvjson.json";
import sqlDataNakshatra from "../assets/jsonnakshara.json";
import sqlDataGothra from "../assets/gothra.json";
import sqlDataSeva from "../assets/seva.json";
import sqlDataSannidhi from "../assets/sannidhi.json";
import sqlDataMstComp from "../assets/mstcom.json";

var db;

const initializeDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("vTempleVARADA");
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
    
      CREATE TABLE IF NOT EXISTS MstRASHI (
        RASHIID INTEGER PRIMARY KEY,
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
        SANNIDHIID INTEGER PRIMARY KEY ,
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
    SEVAID INTEGER PRIMARY KEY AUTOINCREMENT,
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
    RASHIID INTEGER NOT NULL,
    Synced BOOLEAN NOT NULL DEFAULT 0
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
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstNAKSHATRA";
  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error("Error fetching Nakshatras:", error);
    throw error;
  }
};

export const getAllRashis = async () => {
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstRASHI";
  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error("Error fetching Rashis:", error);
    throw error;
  }
};

export const getAllGothras = async () => {
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstGOTHRA";
  try {
    const result = await db.getAllAsync(query);
    console.log("====================================");
    console.log("Gothras: From Database.js");
    console.log("====================================");
    return result;
  } catch (error) {
    console.error("Error fetching Gothras:", error);
    throw error;
  }
};

export const GetAllSVA = async () => {
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstSVA";
  try {
    const result = await db.getAllAsync(query);
    console.log("====================================");
    console.log("Seva: From Database.js");
    console.log("====================================");
    return result;
  } catch (error) {
    console.error("Error fetching Seva:", error);
    throw error;
  }
};

export const GetAllSannidhi = async () => {
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstSANNIDHI";
  try {
    const result = await db.getAllAsync(query);
    console.log("====================================");
    console.log("Sannidhi: From Database.js");
    console.log("====================================");
    return result;
  } catch (error) {
    console.error("Error fetching Sannidhi:", error);
    throw error;
  }
};

export const GetAllComp = async () => {
  db = await SQLite.openDatabaseAsync("vTempleVARADA");
  const query = "SELECT * FROM MstComp";
  try {
    const result = await db.getAllAsync(query);
    console.log("====================================");
    console.log("Comp: From Database.js", result);
    console.log("====================================");
    return result;
  } catch (error) {
    console.error("Error fetching Comp:", error);
    throw error;
  }
};

// Insert into MstRASHI
const formatData = (data) => {
  return data.map((item) => ({
    RASHIID: item.RASHIID || null,
    RASHICODE: item.RASHICODE || "",
    RASHINAME: item.RASHINAME || "",
    RASHISeries: item.RASHISeries || "",
    RASHINO: item.RASHINO || 0,
    InActiveRmks: item.InActiveRmks || "",
    InActive: item.InActive || "N",
    Authorised: item.Authorised || "Y",
    AuthBy: item.AuthBy || "",
    AuthOn: item.AuthOn === "NULL" ? null : item.AuthOn,
    AddedBy: item.AddedBy || "",
    AddedOn: item.AddedOn === "NULL" ? null : item.AddedOn,
    ChangedBy: item.ChangedBy || "",
    ChangedOn: item.ChangedOn === "NULL" ? null : item.ChangedOn,
    RashiCodeClean: item.RashiCodeClean || "",
  }));
};

const insertOrUpdateData = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert or update new data
    for (const item of data) {
      console.log("Processing item:", item); // Log each item before processing

      // Check if the item already exists
      const existingItem = await db.getFirstAsync(
        "SELECT * FROM MstRASHI WHERE RASHIID = ?",
        [item.RASHIID]
      );

      if (existingItem && existingItem.length > 0) {
        // Update existing item
        await db.runAsync(
          `UPDATE MstRASHI SET
            RASHICODE = ?, RASHINAME = ?, RASHISeries = ?, RASHINO = ?, 
            InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, 
            AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?, RashiCodeClean = ?
          WHERE RASHIID = ?`,
          [
            item.RASHICODE,
            item.RASHINAME,
            item.RASHISeries,
            item.RASHINO,
            item.InActiveRmks,
            item.InActive,
            item.Authorised,
            item.AuthBy,
            item.AuthOn,
            item.AddedBy,
            item.AddedOn,
            item.ChangedBy,
            item.ChangedOn,
            item.RashiCodeClean,
            item.RASHIID,
          ]
        );
        console.log("Data updated successfully for RASHIID:", item.RASHIID);
      } else {
        // Insert new item
        await db.runAsync(
          `INSERT INTO MstRASHI (
            RASHIID, RASHICODE, RASHINAME, RASHISeries, RASHINO, 
            InActiveRmks, InActive, Authorised, AuthBy, AuthOn, 
            AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.RASHIID,
            item.RASHICODE,
            item.RASHINAME,
            item.RASHISeries,
            item.RASHINO,
            item.InActiveRmks,
            item.InActive,
            item.Authorised,
            item.AuthBy,
            item.AuthOn,
            item.AddedBy,
            item.AddedOn,
            item.ChangedBy,
            item.ChangedOn,
            item.RashiCodeClean,
          ]
        );
        console.log("Data inserted successfully for RASHIID:", item.RASHIID);
      }
    }
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  }
};

const initializeAndInsertData = async () => {
  const hasRun = await AsyncStorage.getItem("initializeAndInsertDataHasRun");
  if (hasRun !== "true") {
    await initializeDatabase();
    if (!Array.isArray(sqlDataRashi)) {
      console.error("sqlDataRashi is not an array or is undefined");
      return;
    }
    const formattedData = formatData(sqlDataRashi);
    await insertOrUpdateData(formattedData);
    await AsyncStorage.setItem("initializeAndInsertDataHasRun", "true");
  } else {
    console.log("initializeAndInsertData has already run.");
  }
};

initializeAndInsertData();

// Insert into MstNAKSHATRA

const formatDataNakshatra = (data) => {
  return data.map((item) => ({
    NAKSHATRAID: item.NAKSHATRAID || null,
    NAKSHATRACODE: item.NAKSHATRACODE || "",
    NAKSHATRANAME: item.NAKSHATRANAME || "",
    NAKSHATRACodeClean: item.NAKSHATRACodeClean || "",
    NAKSHATRASeries: item.NAKSHATRASeries || "",
    NAKSHATRANO: item.NAKSHATRANO || 0,
    InActiveRmks: item.InActiveRmks || "",
    InActive: item.InActive || "N",
    Authorised: item.Authorised || "Y",
    AuthBy: item.AuthBy || "",
    AuthOn: item.AuthOn === "NULL" ? null : item.AuthOn,
    AddedBy: item.AddedBy || "",
    AddedOn: item.AddedOn === "NULL" ? null : item.AddedOn,
    ChangedBy: item.ChangedBy || "",
    ChangedOn: item.ChangedOn === "NULL" ? null : item.ChangedOn,
    RASHIID1: item.RASHIID1 || null,
    RASHIID2: item.RASHIID2 || 0, // Set a default value if RASHIID2 is null
  }));
};

const insertDataNakshatra = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert new data
    for (const item of data) {
      console.log("Inserting Nakshatra item:", item); // Log each item before insertion
      await db.runAsync(
        `INSERT INTO MstNAKSHATRA (
          NAKSHATRAID, NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, 
          NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, 
          AddedBy, AddedOn, ChangedBy, ChangedOn, RASHIID1, RASHIID2
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

        [
          item.NAKSHATRAID,
          item.NAKSHATRACODE,
          item.NAKSHATRANAME,
          item.NAKSHATRACodeClean,
          item.NAKSHATRASeries,
          item.NAKSHATRANO,
          item.InActiveRmks,
          item.InActive,
          item.Authorised,
          item.AuthBy,
          item.AuthOn,
          item.AddedBy,
          item.AddedOn,
          item.ChangedBy,
          item.ChangedOn,
          item.RASHIID1,
          item.RASHIID2,
        ]
      );
      console.log("Nakshatra data inserted successfully for NAKSHATRAID:");
    }

    // Verify data insertion
    const result = await db.getAllAsync("SELECT * FROM MstNAKSHATRA");
    console.log("Nakshatra data from SQLite:");
  } catch (error) {
    console.error("Error inserting Nakshatra data:", error);
  }
};

const initializeAndInsertDataNakshatra = async () => {
  const hasRun = await AsyncStorage.getItem(
    "initializeAndInsertDataNakshatraHasRun"
  );
  if (hasRun !== "true") {
    await initializeDatabase();
    const formattedData = formatDataNakshatra(sqlDataNakshatra);
    await insertDataNakshatra(formattedData);
    await AsyncStorage.setItem(
      "initializeAndInsertDataNakshatraHasRun",
      "true"
    );
  } else {
    console.log("initializeAndInsertDataNakshatra has already run.");
  }
};

initializeAndInsertDataNakshatra();

// insert into MstGOTHRA
const formatDataGothra = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("Input data is not an array");
  }
  return data.map((item) => ({
    GOTHRAID: item.GOTHRAID || null,
    GOTHRACODE: item.GOTHRACODE || "",
    GOTHRANAME: item.GOTHRANAME || "",
    GOTHRACodeClean: item.GOTHRACodeClean || "",
    GOTHRASeries: item.GOTHRASeries || "",
    GOTHRAno: item.GOTHRAno || 0,
    InActiveRmks: item.InActiveRmks || "",
    InActive: item.InActive || "N",
    Authorised: item.Authorised || "Y",
    AuthBy: item.AuthBy || "",
    AuthOn: item.AuthOn === "NULL" ? null : item.AuthOn,
    AddedBy: item.AddedBy || "",
    AddedOn: item.AddedOn === "NULL" ? null : item.AddedOn,
    ChangedBy: item.ChangedBy || "",
    ChangedOn:
      item.ChangedOn === "NULL" ? new Date().toISOString() : item.ChangedOn, // Provide default value
  }));
};

const insertDataGothra = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert new data
    for (const item of data) {
      console.log("Inserting Gothra item:", item); // Log each item before insertion
      await db.runAsync(
        `INSERT OR REPLACE INTO MstGOTHRA (
          GOTHRAID, GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, 
          GOTHRAno, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, 
          AddedBy, AddedOn, ChangedBy, ChangedOn
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.GOTHRAID,
          item.GOTHRACODE,
          item.GOTHRANAME,
          item.GOTHRACodeClean,
          item.GOTHRASeries,
          item.GOTHRAno,
          item.InActiveRmks,
          item.InActive,
          item.Authorised,
          item.AuthBy,
          item.AuthOn,
          item.AddedBy,
          item.AddedOn,
          item.ChangedBy,
          item.ChangedOn,
        ]
      );
      console.log(
        "Gothra data inserted successfully for GOTHRAID:",
        item.GOTHRAID
      );
    }
  } catch (error) {
    console.error("Error inserting Gothra data:", error);
  }
};

const initializeAndInsertDataGothra = async () => {
  const hasRun = await AsyncStorage.getItem(
    "initializeAndInsertDataGothraHasRun"
  );
  if (hasRun !== "true") {
    await initializeDatabase();
    if (!Array.isArray(sqlDataGothra)) {
      console.error("sqlDataGothra is not an array or is undefined");
      return;
    }
    const formattedData = formatDataGothra(sqlDataGothra);
    await insertDataGothra(formattedData);
    await AsyncStorage.setItem("initializeAndInsertDataGothraHasRun", "true");
  } else {
    console.log("initializeAndInsertDataGothra has already run.");
  }
};

initializeAndInsertDataGothra();
// Insert into MstSVA

const formatDataSVA = (data) => {
  return data.map((item) => ({
    SVAID: item.SVAID,
    SVACODE: item.SVACODE || "",
    SVANAME: item.SVANAME || "",
    SVACodeClean: item.SVACodeClean || "",
    SVASeries: item.SVASeries || "",
    SVANO: item.SVANO || 0,
    InActiveRmks: item.InActiveRmks || "",
    InActive: item.InActive || "N",
    Authorised: item.Authorised || "Y",
    AuthBy: item.AuthBy || "",
    AuthOn:
      item.AuthOn === "NULL"
        ? new Date().toISOString()
        : item.AuthOn || new Date().toISOString(),
    AddedBy: item.AddedBy || "",
    AddedOn: item.AddedOn === "NULL" ? null : item.AddedOn,
    ChangedBy: item.ChangedBy || "",
    ChangedOn:
      item.ChangedOn === "NULL" ? new Date().toISOString() : item.ChangedOn,
    AMT: item.AMT === "NULL" ? 0 : item.AMT || 0, // Ensure AMT is not null
    RMKS: item.RMKS === "NULL" ? "" : item.RMKS,
    RMKS_XML: item.RMKS_XML || "",
    SEVAINKAN: item.SEVAINKAN === "NULL" ? "" : item.SEVAINKAN,
    SVADISPNAME: item.SVADISPNAME || "",
  }));
};

const insertDataSVA = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert new data
    for (const item of data) {
      console.log("Inserting SVA item:", item); // Log each item before insertion

      try {
        await db.runAsync(
          `INSERT INTO MstSVA (
            SVAID, SVACODE, SVANAME, SVACodeClean, SVASeries, 
            SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, 
            AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.SVAID,
            item.SVACODE,
            item.SVANAME,
            item.SVACodeClean,
            item.SVASeries,
            item.SVANO,
            item.InActiveRmks,
            item.InActive,
            item.Authorised,
            item.AuthBy,
            item.AuthOn,
            item.AddedBy,
            item.AddedOn,
            item.ChangedBy,
            item.ChangedOn,
            item.AMT,
            item.RMKS,
            item.RMKS_XML,
            item.SEVAINKAN,
            item.SVADISPNAME,
          ]
        );
        console.log("SVA data inserted successfully for SVAID:", item.SVAID);
      } catch (error) {
        console.error("Error inserting SVA data:", error);
      }
    }
  } catch (error) {
    console.error("Error inserting SVA data:", error);
  }
};

const initializeAndInsertDataSVA = async () => {
  const hasRun = await AsyncStorage.getItem("initializeAndInsertDataSVAHasRun");
  if (hasRun !== "true") {
    await initializeDatabase();
    const formattedData = formatDataSVA(sqlDataSeva);
    await insertDataSVA(formattedData);
    await AsyncStorage.setItem("initializeAndInsertDataSVAHasRun", "true");
  } else {
    console.log("initializeAndInsertDataSVA has already run.");
  }
};

initializeAndInsertDataSVA();

// Insert into MstSANNIDHI

const createTableMstSANNIDHI = async () => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    await db.runAsync(`
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
    `);
    console.log("MstSANNIDHI table created successfully.");
  } catch (error) {
    console.error("Error creating MstSANNIDHI table:", error);
  }
};

const formatDataSANNIDHI = (data) => {
  return data.map((item) => ({
    SANNIDHIID: item.SANNIDHIID,
    SANNIDHICODE: item.SANNIDHICODE || "",
    SANNIDHINAME: item.SANNIDHINAME || "",
    SANNIDHICodeClean: item.SANNIDHICodeClean || "",
    SANNIDHISeries: item.SANNIDHISeries || "",
    SANNIDHINO: item.SANNIDHINO || 0,
    InActiveRmks: item.InActiveRmks || "",
    InActive: item.InActive || "N",
    Authorised: item.Authorised || "Y",
    AuthBy: item.AuthBy || "",
    AuthOn:
      item.AuthOn === "NULL"
        ? new Date().toISOString()
        : item.AuthOn || new Date().toISOString(),
    AddedBy: item.AddedBy || "",
    AddedOn: item.AddedOn === "NULL" ? null : item.AddedOn,
    ChangedBy: item.ChangedBy || "",
    ChangedOn:
      item.ChangedOn === "NULL" ? new Date().toISOString() : item.ChangedOn,
  }));
};

const insertDataSANNIDHI = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert new data
    for (const item of data) {
      console.log("Inserting SANNIDHI item:", item); // Log each item before insertion

      try {
        await db.runAsync(
          `INSERT INTO MstSANNIDHI (
            SANNIDHIID, SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, 
            SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, 
            AddedBy, AddedOn, ChangedBy, ChangedOn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

          [
            item.SANNIDHIID,
            item.SANNIDHICODE,
            item.SANNIDHINAME,
            item.SANNIDHICodeClean,
            item.SANNIDHISeries,
            item.SANNIDHINO,
            item.InActiveRmks,
            item.InActive,
            item.Authorised,
            item.AuthBy,
            item.AuthOn,
            item.AddedBy,
            item.AddedOn,
            item.ChangedBy,
            item.ChangedOn,
          ]
        );
        console.log("SANNIDHI data inserted successfully for SANNIDHIID:");
      } catch (error) {
        console.error("Error inserting SANNIDHI data:", error);
      }
    }
  } catch (error) {
    console.error("Error inserting SANNIDHI data:", error);
  }
};

const initializeAndInsertDataSANNIDHI = async () => {
  const hasRun = await AsyncStorage.getItem(
    "initializeAndInsertDataSANNIDHIHasRun"
  );
  if (hasRun !== "true") {
    await createTableMstSANNIDHI();
    const formattedData = formatDataSANNIDHI(sqlDataSannidhi);
    await insertDataSANNIDHI(formattedData);
    await AsyncStorage.setItem("initializeAndInsertDataSANNIDHIHasRun", "true");
  } else {
    console.log("initializeAndInsertDataSANNIDHI has already run.");
  }
};

initializeAndInsertDataSANNIDHI();

// Insert into MstComp
const formatDataComp = (data) => {
  return data.map((item) => ({
    CompID: item.CompID,
    CompName: item.CompName || "",
    Address1: item.Address1 || "",
    Address2: item.Address2 || "",
    Address3: item.Address3 || "",
    Address4: item.Address4 || "",
    Address5: item.Address5 === "NULL" ? "" : item.Address5,
    JpgFile: item.JpgFile || null,
    Custcode: item.Custcode || "",
    EMAIL: item.EMAIL || "",
    MOBNO: item.MOBNO || "",
    PANNO: item.PANNO || "",
    WEB: item.WEB || "",
    GSTNO: item.GSTNO || "",
    CompLoc: item.CompLoc || "",
    CINNO: item.CINNO || "",
    TELNO: item.TELNO || "",
    DashBoardLink: item.DashBoardLink || "",
  }));
};

const insertDataComp = async (data) => {
  const db = await SQLite.openDatabaseAsync("vTempleVARADA");
  try {
    // Insert new data
    for (const item of data) {
      console.log("Inserting Comp item:", item); // Log each item before insertion

      try {
        await db.runAsync(
          `INSERT INTO MstComp (
            CompID, CompName, Address1, Address2, Address3, Address4, Address5, 
            JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.CompID,
            item.CompName,
            item.Address1,
            item.Address2,
            item.Address3,
            item.Address4,
            item.Address5,
            item.JpgFile,
            item.Custcode,
            item.EMAIL,
            item.MOBNO,
            item.PANNO,
            item.WEB,
            item.GSTNO,
            item.CompLoc,
            item.CINNO,
            item.TELNO,
            item.DashBoardLink,
          ]
        );
        console.log("Comp data inserted successfully for CompID:", item.CompID);
      } catch (error) {
        console.error("Error inserting Comp data:", error);
      }
    }
  } catch (error) {
    console.error("Error inserting Comp data:", error);
  }
};

const initializeAndInsertDataComp = async () => {
  const hasRun = await AsyncStorage.getItem(
    "initializeAndInsertDataCompHasRun"
  );
  if (hasRun !== "true") {
    await initializeDatabase();
    const formattedData = formatDataComp(sqlDataMstComp);
    await insertDataComp(formattedData);
    await AsyncStorage.setItem("initializeAndInsertDataCompHasRun", "true");
  } else {
    console.log("initializeAndInsertDataComp has already run.");
  }
};

initializeAndInsertDataComp();
