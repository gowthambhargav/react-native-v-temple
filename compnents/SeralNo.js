import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SerialNo = () => {
  const date = new Date();
const [SeralNo, setSeralNo] = useState(0);
const count = "0001";
  const currentDate = date.getDate()
  const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{yearLastTwoDigits}{currentDate}{"01"}{SeralNo}{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SerialNo;