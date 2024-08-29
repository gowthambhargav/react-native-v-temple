// LoadingComponent.js
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableHighlight } from 'react-native';

const LoadingComponent = ({ name }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>{name}...</Text>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333333',
  },
});

export default LoadingComponent;