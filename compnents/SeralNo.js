import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SerialNo = ({SeralNo, setSeralNo}) => {
  const [loaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

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
});

export default SerialNo;