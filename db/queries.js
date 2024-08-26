import { openDatabase } from './database';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';



const db =  openDatabase().then((db) => {
  db;
  console.log('====================================');
  console.log('Database opened successfully',db);
  console.log('====================================');
}).catch((error) => {
  console.error('Error opening database:', error);
});

export const insertUser = async (user) => {
  const { UserCode, LoginPwd, UserName, EmailID, Remarks, UserImg, DESIGNATION, Mobileno, Department, ChkDOB, DOB, OTP, OTPValidity, Inactive, InactiveRmks, RoleID, Authorised, AuthBy, AuthOn, PwdResetDt } = user;
  await db.runAsync(`
    INSERT INTO MstUser (UserCode, LoginPwd, UserName, EmailID, Remarks, UserImg, DESIGNATION, Mobileno, Department, ChkDOB, DOB, OTP, OTPValidity, Inactive, InactiveRmks, RoleID, Authorised, AuthBy, AuthOn, PwdResetDt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [UserCode, LoginPwd, UserName, EmailID, Remarks, UserImg, DESIGNATION, Mobileno, Department, ChkDOB, DOB, OTP, OTPValidity, Inactive, InactiveRmks, RoleID, Authorised, AuthBy, AuthOn, PwdResetDt]);
};

// Function to update a user by ID
export const updateUserById = async (userID, user) => {
  const { UserCode, LoginPwd, UserName, EmailID, Remarks, UserImg, DESIGNATION, Mobileno, Department, ChkDOB, DOB, OTP, OTPValidity, Inactive, InactiveRmks, RoleID, Authorised, AuthBy, AuthOn, PwdResetDt } = user;
  await db.runAsync(`
    UPDATE MstUser
    SET UserCode = ?, LoginPwd = ?, UserName = ?, EmailID = ?, Remarks = ?, UserImg = ?, DESIGNATION = ?, Mobileno = ?, Department = ?, ChkDOB = ?, DOB = ?, OTP = ?, OTPValidity = ?, Inactive = ?, InactiveRmks = ?, RoleID = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, PwdResetDt = ?
    WHERE UserID = ?
  `, [UserCode, LoginPwd, UserName, EmailID, Remarks, UserImg, DESIGNATION, Mobileno, Department, ChkDOB, DOB, OTP, OTPValidity, Inactive, InactiveRmks, RoleID, Authorised, AuthBy, AuthOn, PwdResetDt, userID]);
};

// Function to get a user by ID
export const getUserById = async (userID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstUser WHERE UserID = ?
  `, [userID]);
  return result;
};

// Function to insert a company
export const insertComp = async (comp) => {
  const { CompName, Address1, Address2, Address3, Address4, Address5, JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink } = comp;
  await db.runAsync(`
    INSERT INTO MstComp (CompName, Address1, Address2, Address3, Address4, Address5, JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [CompName, Address1, Address2, Address3, Address4, Address5, JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink]);
};

// Function to update a company by ID
export const updateCompById = async (compID, comp) => {
  const { CompName, Address1, Address2, Address3, Address4, Address5, JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink } = comp;
  await db.runAsync(`
    UPDATE MstComp
    SET CompName = ?, Address1 = ?, Address2 = ?, Address3 = ?, Address4 = ?, Address5 = ?, JpgFile = ?, Custcode = ?, EMAIL = ?, MOBNO = ?, PANNO = ?, WEB = ?, GSTNO = ?, CompLoc = ?, CINNO = ?, TELNO = ?, DashBoardLink = ?
    WHERE CompID = ?
  `, [CompName, Address1, Address2, Address3, Address4, Address5, JpgFile, Custcode, EMAIL, MOBNO, PANNO, WEB, GSTNO, CompLoc, CINNO, TELNO, DashBoardLink, compID]);
};

// Function to get a company by ID
export const getCompById = async (compID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstComp WHERE CompID = ?
  `, [compID]);
  return result;
};

// Function to insert a GOTHRA
export const insertGothra = async (gothra) => {
  const { GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, GOTHRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = gothra;
  await db.runAsync(`
    INSERT INTO MstGOTHRA (GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, GOTHRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, GOTHRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn]);
};

// Function to update a GOTHRA by ID
export const updateGothraById = async (gothraID, gothra) => {
  const { GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, GOTHRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = gothra;
  await db.runAsync(`
    UPDATE MstGOTHRA
    SET GOTHRACODE = ?, GOTHRANAME = ?, GOTHRACodeClean = ?, GOTHRASeries = ?, GOTHRANO = ?, InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?
    WHERE GOTHRAID = ?
  `, [GOTHRACODE, GOTHRANAME, GOTHRACodeClean, GOTHRASeries, GOTHRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, gothraID]);
};

// Function to get a GOTHRA by ID
export const getGothraById = async (gothraID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstGOTHRA WHERE GOTHRAID = ?
  `, [gothraID]);
  return result;
};

// Function to insert a NAKSHATRA
export const insertNakshatra = async (nakshatra) => {
  const { NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = nakshatra;
  await db.runAsync(`
    INSERT INTO MstNAKSHATRA (NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn]);
};

// Function to update a NAKSHATRA by ID
export const updateNakshatraById = async (nakshatraID, nakshatra) => {
  const { NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = nakshatra;
  await db.runAsync(`
    UPDATE MstNAKSHATRA
    SET NAKSHATRACODE = ?, NAKSHATRANAME = ?, NAKSHATRACodeClean = ?, NAKSHATRASeries = ?, NAKSHATRANO = ?, InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?
    WHERE NAKSHATRAID = ?
  `, [NAKSHATRACODE, NAKSHATRANAME, NAKSHATRACodeClean, NAKSHATRASeries, NAKSHATRANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, nakshatraID]);
};

// Function to get a NAKSHATRA by ID
export const getNakshatraById = async (nakshatraID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstNAKSHATRA WHERE NAKSHATRAID = ?
  `, [nakshatraID]);
  return result;
};

// Function to insert a RASHI
export const insertRashi = async (rashi) => {
  const { RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean } = rashi;
  await db.runAsync(`
    INSERT INTO MstRASHI (RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean]);
};

// Function to update a RASHI by ID
export const updateRashiById = async (rashiID, rashi) => {
  const { RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean } = rashi;
  await db.runAsync(`
    UPDATE MstRASHI
    SET RASHICODE = ?, RASHINAME = ?, RASHISeries = ?, RASHINO = ?, InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?, RashiCodeClean = ?
    WHERE RASHIID = ?
  `, [RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean, rashiID]);
};

// Function to get a RASHI by ID
export const getRashiById = async (rashiID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstRASHI WHERE RASHIID = ?
  `, [rashiID]);
  return result;
};

// Function to insert a SANNIDHI
export const insertSannidhi = async (sannidhi) => {
  const { SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = sannidhi;
  await db.runAsync(`
    INSERT INTO MstSANNIDHI (SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn]);
};

// Function to update a SANNIDHI by ID
export const updateSannidhiById = async (sannidhiID, sannidhi) => {
  const { SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn } = sannidhi;
  await db.runAsync(`
    UPDATE MstSANNIDHI
    SET SANNIDHICODE = ?, SANNIDHINAME = ?, SANNIDHICodeClean = ?, SANNIDHISeries = ?, SANNIDHINO = ?, InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?
    WHERE SANNIDHIID = ?
  `, [SANNIDHICODE, SANNIDHINAME, SANNIDHICodeClean, SANNIDHISeries, SANNIDHINO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, sannidhiID]);
};

// Function to get a SANNIDHI by ID
export const getSannidhiById = async (sannidhiID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstSANNIDHI WHERE SANNIDHIID = ?
  `, [sannidhiID]);
  return result;
};

// Function to insert a SVA
export const insertSva = async (sva) => {
  const { SVACODE, SVANAME, SVACodeClean, SVASeries, SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME } = sva;
  await db.runAsync(`
    INSERT INTO MstSVA (SVACODE, SVANAME, SVACodeClean, SVASeries, SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [SVACODE, SVANAME, SVACodeClean, SVASeries, SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME]);
};

// Function to update a SVA by ID
export const updateSvaById = async (svaID, sva) => {
  const { SVACODE, SVANAME, SVACodeClean, SVASeries, SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME } = sva;
  await db.runAsync(`
    UPDATE MstSVA
    SET SVACODE = ?, SVANAME = ?, SVACodeClean = ?, SVASeries = ?, SVANO = ?, InActiveRmks = ?, InActive = ?, Authorised = ?, AuthBy = ?, AuthOn = ?, AddedBy = ?, AddedOn = ?, ChangedBy = ?, ChangedOn = ?, AMT = ?, RMKS = ?, RMKS_XML = ?, SEVAINKAN = ?, SVADISPNAME = ?
    WHERE SVAID = ?
  `, [SVACODE, SVANAME, SVACodeClean, SVASeries, SVANO, InActiveRmks, InActive, Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, AMT, RMKS, RMKS_XML, SEVAINKAN, SVADISPNAME, svaID]);
};

// Function to get a SVA by ID
export const getSvaById = async (svaID) => {
  const result = await db.getAsync(`
    SELECT * FROM MstSVA WHERE SVAID = ?
  `, [svaID]);
  return result;
};




export const csvDataUpload = async () => {
  const filePath = "assets/Data-csv/MstRASHI.csv";
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    FileSystem.readAsStringAsync(filePath)
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: async (result) => {
            try {
              for (const rashi of result.data) {
                await insertRashi(db, rashi); // Ensure insertRashi function is available in scope
              }
              console.log('CSV data uploaded and inserted into MstRASHI table successfully');
              resolve(result.data);
            } catch (error) {
              console.error('Error inserting CSV data into MstRASHI table:', error);
              reject(error);
            }
          },
          error: (error) => {
            console.error('Error parsing CSV data:', error);
            reject(error);
          }
        });
      })
      .catch((error) => {
        console.error('Error reading file:', error);
        reject(error);
      });
  });
};



