import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fontStyles from '../utils/fontStyles';

const Card = ({ data }) => {
  return (
    <View style={styles.card}>
    {Object.keys(data).map((key) => (
      <View style={styles.row} key={key}>
        <Text style={[styles.label,fontStyles.robotoBold]}>{key}</Text>
        <Text style={[styles.value,fontStyles.robotoRegular]}>{data[key]}</Text>
      </View>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    margin: 10,
    height:"auto" // Adjust this to fit your design needs
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#555555',
    flex: 2,
    textAlign: 'right',
  },
});

export default Card;
