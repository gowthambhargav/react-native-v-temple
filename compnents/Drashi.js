import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import fontStyles from '../utils/fontStyles';
import { getAllRashis } from '../db/database';


const Drashi = ({dplable,lable,rashi,setRashi}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [rashiData, setrashiData] = useState([]);
  useEffect(() => {
    const testFetch = async () => {
      try {
        const dataFromSqlLite = await getAllRashis();

        // Filter out the item with RASHIID equal to 1
        const filteredData = dataFromSqlLite.filter(item => item.RASHIID !== 1);
        
        // Map the filtered data to the desired format
        const mappedData = filteredData.map(item => ({
          label: `${item.RASHINAME} ${item.RASHIID}`,
          value: item.RASHIID,
        }));
        
        // Set the filtered and mapped data to rashiData
        setrashiData(mappedData);
       
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
        data={rashiData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? lable : '...'}
        searchPlaceholder="Search..."
        value={rashi}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // console.log(item,"hkhkjhkhj");
          setRashi(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Drashi;

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