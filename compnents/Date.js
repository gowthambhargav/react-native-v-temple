import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CurrentDateComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDate = `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`; // Format: dd/mm/yyyy
      setCurrentDate(formattedDate);
    }, 1000); // Update every second
  
    return () => clearInterval(interval);
  }, []);  // Empty dependency array to run effect only on mount

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Dt:{currentDate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurrentDateComponent;
