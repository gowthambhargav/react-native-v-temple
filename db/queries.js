import { openDatabase } from './database';

export const insertUser = async (name, age) => {
  const db = await openDatabase();
  await db.runAsync('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
};

export const updateUser = async (id, age) => {
  const db = await openDatabase();
  await db.runAsync('UPDATE users SET age = ? WHERE id = ?', [age, id]);
};

export const fetchUsers = async () => {
  const db = await openDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM users');
  return allRows;
};