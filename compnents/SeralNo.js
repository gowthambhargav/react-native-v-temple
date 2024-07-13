import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SerialNo = ({SeralNo, setSeralNo}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{SeralNo}</Text>
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