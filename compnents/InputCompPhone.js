import React,{useState} from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const LabeledTextInputPhone = ({ label, setPhone,phone,...rest }) => {
  const phoneNumberRegex = /^(?!(\d)\1+$)\d{10}$/;
    const [isValid, setIsValid] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
        onChangeText={(text) => {
            if (phoneNumberRegex.test(text)) {
                setIsValid(true); // Phone number is valid
                // Proceed with further logic (e.g., form submission)
            
              } else {
                setIsValid(false); // Phone number is invalid
                setPhone(text)
               
              }
        }

        }
          style={styles.input}
          value={phone}
          placeholderTextColor="gray"
          {...rest}
        />
      </View>
        {!isValid ? <Text style={{ color: 'red' }}>Invalid phone number</Text>:null}
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
    color: 'black',
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

export default LabeledTextInputPhone;
