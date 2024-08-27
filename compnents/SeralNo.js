import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SerialNo = ({SeralNo, setSeralNo}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>No:{SeralNo}</Text>
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
    fontSize: 15,
    // fontWeight: '400',
    fontFamily: 'Poppins-Medium',
  },
  loadingText: {
    fontSize: 15,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SerialNo;