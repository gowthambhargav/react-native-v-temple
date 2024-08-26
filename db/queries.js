import { openDatabase } from './database';

const getDb = async () => {
  const db = await openDatabase();
  return db;
};

export const insertRashi = async (rashi) => {
  const db = await getDb();
  const {
    RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
    Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
  } = rashi;
  await db.execAsync(`
    INSERT INTO MstRASHI (
      RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
      Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    RASHICODE, RASHINAME, RASHISeries, RASHINO, InActiveRmks, InActive,
    Authorised, AuthBy, AuthOn, AddedBy, AddedOn, ChangedBy, ChangedOn, RashiCodeClean
  ]);
};

export const getRashis = async () => {
  const db = await getDb();
  try {
    const rows = await db.execAsync(`
      SELECT * FROM MstRASHI
    `);
    return rows;
  } catch (err) {
    throw new Error(`Error fetching Rashis: ${err.message}`);
  }
};