import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DatabaseExample = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await SQLite.openDatabaseAsync('mydatabase.db');

      // Execute bulk queries
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);
        INSERT INTO users (name, age) VALUES ('Alice', 30);
        INSERT INTO users (name, age) VALUES ('Bob', 25);
        INSERT INTO users (name, age) VALUES ('Charlie', 40);
      `);

      // Insert data
      const result = await db.runAsync('INSERT INTO users (name, age) VALUES (?, ?)', 'David', 35);
      console.log(result.lastInsertRowId, result.changes);
      await db.runAsync('UPDATE users SET age = ? WHERE name = ?', 45, 'David');
      await db.runAsync('DELETE FROM users WHERE name = $name', { $name: 'David' });

      // Fetch single row
      const firstRow = await db.getFirstAsync('SELECT * FROM users');
      console.log('====================================');
      console.log(firstRow.id, firstRow.name, firstRow.age);
      console.log('====================================');

      // Fetch all rows
      const allRows = await db.getAllAsync('SELECT * FROM users');
      for (const row of allRows) {
        console.log('====================================');
        console.log(row.id, row.name, row.age);
        console.log('====================================');
      }

   
    };

    initializeDatabase();
  }, []);

  return (
    <View>
      <Text>Database Example</Text>
    </View>
  );
};

export default DatabaseExample;