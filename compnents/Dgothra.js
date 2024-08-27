import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import fontStyles from "../utils/fontStyles";
import { useFonts } from "expo-font";
import { getAllGothras } from "../db/database";

const Dgothra = ({ dplable, lable, setGothra, gothra }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [GothraData, setGothraData] = useState([]);
  const [loaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Popins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    const testFetch = async () => {
      try {
        const GothraData = await getAllGothras();
        const filteredData = GothraData.filter(item => item.RASHIID !== 0);
        const gothraData = filteredData.map((item) => ({
          label:`${item.GOTHRANAME} ${item.GOTHRAID}` ,
          value: item.GOTHRAID,
        }));
        setGothraData(gothraData);
      
      } catch (error) {
        console.error("Test fetch error:", error);
      }
    };

    testFetch();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, fontStyles.robotoRegular,isFocus && { color: "blue" }]}>
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
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={[styles.placeholderStyle,fontStyles.robotoRegular]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={GothraData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? lable : "..."}
        searchPlaceholder="Search..."
        value={gothra}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // console.log(item,"hkhkjhkhj");
          setGothra(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Dgothra;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    marginTop: -15,
    backgroundColor: "white",
    padding: 16,
    width: 320,
    // top: -15,
  },
  dropdown: {
    fontFamily:"Popins-Bold",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
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
