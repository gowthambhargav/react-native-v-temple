export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('vTempleVARADA.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      );
      CREATE TABLE IF NOT EXISTS MstComp (
        CompID INTEGER PRIMARY KEY AUTOINCREMENT,
        CompName VARCHAR(250) NOT NULL,
        Address1 VARCHAR(100),
        Address2 VARCHAR(100),
        Address3 VARCHAR(100),
        Address4 VARCHAR(100),
        Address5 VARCHAR(100),
        JpgFile BLOB,
        Custcode VARCHAR(50),
        EMAIL VARCHAR(100),
        MOBNO VARCHAR(30),
        PANNO VARCHAR(10),
        WEB VARCHAR(50),
        GSTNO VARCHAR(15),
        CompLoc VARCHAR(50) NOT NULL,
        CINNO VARCHAR(50),
        TELNO VARCHAR(50),
        DashBoardLink VARCHAR(500)
      );
      CREATE TABLE IF NOT EXISTS MstGOTHRA (
        GOTHRAID INTEGER PRIMARY KEY AUTOINCREMENT,
        GOTHRACODE VARCHAR(50),
        GOTHRANAME VARCHAR(250),
        GOTHRACodeClean VARCHAR(50),
        GOTHRASeries VARCHAR(10),
        GOTHRANO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME
      );
      CREATE TABLE IF NOT EXISTS MstNAKSHATRA (
        NAKSHATRAID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAKSHATRACODE VARCHAR(50),
        NAKSHATRANAME VARCHAR(250),
        NAKSHATRACodeClean VARCHAR(50),
        NAKSHATRASeries VARCHAR(10),
        NAKSHATRANO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME
      );
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
      CREATE TABLE IF NOT EXISTS MstSANNIDHI (
        SANNIDHIID INTEGER PRIMARY KEY AUTOINCREMENT,
        SANNIDHICODE VARCHAR(50),
        SANNIDHINAME VARCHAR(250),
        SANNIDHICodeClean VARCHAR(50),
        SANNIDHISeries VARCHAR(10),
        SANNIDHINO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME
      );
      CREATE TABLE IF NOT EXISTS MstSVA (
        SVAID INTEGER PRIMARY KEY AUTOINCREMENT,
        SVACODE VARCHAR(250),
        SVANAME VARCHAR(250),
        SVACodeClean VARCHAR(50),
        SVASeries VARCHAR(10),
        SVANO NUMERIC(19, 2),
        InActiveRmks VARCHAR(250),
        InActive CHAR(1),
        Authorised CHAR(1),
        AuthBy VARCHAR(50),
        AuthOn DATETIME,
        AddedBy VARCHAR(50),
        AddedOn DATETIME,
        ChangedBy VARCHAR(50),
        ChangedOn DATETIME,
        AMT NUMERIC(19, 2),
        RMKS VARCHAR(250),
        RMKS_XML VARCHAR(MAX),
        SEVAINKAN NVARCHAR(250),
        SVADISPNAME VARCHAR(50)
      );
    `);
  }
};