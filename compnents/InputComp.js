import React from 'react';
import { View, TextInput, Text, StyleSheet,requred } from 'react-native';
import fontStyles from '../utils/fontStyles';

const LabeledTextInput = ({ label,setName,name, ...rest }) => {
  const handleChangeText = (text) => {
    // console.log('====================================');
    // console.log(text,"text");
    // console.log('====================================');
    setName(text); // Call setName with the updated text value
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.label,fontStyles.robotoRegular]}>{label}<Text style={{color:"red",fontSize:20}}> *</Text></Text>
      <View style={[styles.inputContainer]}>
        <TextInput value={name} onChangeText={handleChangeText}
          style={styles.input}
          placeholderTextColor="gray"
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 16,
    // color: 'red',
    zIndex: 1,
    textTransform: 'capitalize',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    zIndex: 0,
  },
  input: {
    maxWidth:300,
    width: 260,
    fontSize: 16,
    color: 'black',
  },
  
});

export default LabeledTextInput;
