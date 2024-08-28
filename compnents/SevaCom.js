import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import fontStyles from '../utils/fontStyles';
import { GetAllSVA } from '../db/database';

const SevaCom = ({dplable,lable,setSeva,value,requred}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [SevaData, setSevaData] = useState([]);
  useEffect(() => {
    const testFetch = async () => {
      try {
       const sqlData = await GetAllSVA();
       console.log(sqlData,"sqlData");
       
       const filteredData = sqlData.filter((item) => item.SVAID !== 0);
        const sevaData = filteredData.map((item) => ({
          label: `${item.SVANAME} ${item.SVAID}`,
          value: item.SVAID,
        }));
        setSevaData(sevaData);
       
      } catch (error) {
        console.error('Test fetch error:', error);
      }
    };
  
    testFetch();
  }, []);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, fontStyles.robotoRegular,isFocus && { color: 'blue' }]}>
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
        placeholderStyle={[styles.placeholderStyle,fontStyles.robotoRegular]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={SevaData}
        search
        maxHeight={600}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ?<Text>{lable}{requred?<Text style={{color:"red",fontSize:20}}> *</Text>:null}</Text> : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // console.log(item,"hkhkjhkhj");
          setSeva(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SevaCom;

const styles = StyleSheet.create({
  container: {
    marginBottom:0,
    marginTop:-15,
    backgroundColor: 'white',
    padding: 16,
    width:320,
    // top: -15,
    
  },
  dropdown: {
    height: 50,
    borderColor:  'gray',
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