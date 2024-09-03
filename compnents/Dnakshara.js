import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import fontStyles from '../utils/fontStyles';
import { getAllNakshatras } from '../db/database';


const Dnakshara = ({dplable,lable,setNakshatra,nakshatra}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [naksharaData, setnaksharaData] = useState([]);
  useEffect(() => {
    const testFetch = async () => {
      try {
        const dataFromSqlLite = await getAllNakshatras();
        const filteredData = dataFromSqlLite.filter(item => item.NAKSHATRANO !== 1);
        const mappedData = filteredData.map(item => ({
          label: `${item.NAKSHATRANAME} ${item.NAKSHATRAID}`,
          value: item.NAKSHATRAID,
        }));
        setnaksharaData(mappedData);
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
        data={naksharaData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? lable : '...'}
        searchPlaceholder="Search..."
        value={nakshatra}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setNakshatra(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Dnakshara;

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