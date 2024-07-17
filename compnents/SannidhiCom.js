import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' }, 
];

const SannidhiCom = ({dplable,lable,setSannidhi,value,requred}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [sannidhiData, setSannidhiData] = useState([]);
useEffect(() => {
  const testFetch = async () => {
    try {
      const response = await axios.get('https://react-native-v-temple-b.onrender.com/api/sannidhi');
      const data = response.data;
      // console.log(data.SANNIDHIres[0], "data");
      // Ensure data.SANNIDHIres is an array before setting it
      if (Array.isArray(data.SANNIDHIres)) {
        setSannidhiData(data.SANNIDHIres.map(item => ({
          label: `${item.SANNIDHINAME} ${item.SANNIDHIID}`,
          value: item.SANNIDHINAME
        })));
      } else {
        console.error('Expected data.SANNIDHIres to be an array but got:', typeof data.SANNIDHIres);
      }
    } catch (error) {
      console.error('Test fetch error:', error);
    }
  };

  testFetch();
}, []);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {dplable}
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={sannidhiData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ?<Text>{lable}{requred?<Text style={{color:"red",fontSize:20}}> *</Text>:null}</Text> : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // console.log(item,"hkhkjhkhj");
          setSannidhi(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SannidhiCom;

const styles = StyleSheet.create({
  container: {
    marginBottom:0,
    // marginTop:-20,
    backgroundColor: 'white',
    padding: 16,
    width:320,
    top: 5,
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    // color:'red',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});