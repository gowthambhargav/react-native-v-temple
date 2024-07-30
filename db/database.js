import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('mydatabase.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);
    `);
  }
  return db;
};