import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
function SevaReciept({ HandleSavePrint, sevaDetails, setShowResipt }) {
  const date = new Date();
  const [currentDate, setCurrentDate] = useState("");
  const [sevaAmount, setSevaAmount] = useState(0);
  const [addressData,setaddressData] =useState()

  const HandleFetchSevaAmount = async () => {
    const response = await axios.post(
      "https://react-native-v-temple-b.onrender.com/api/seva/",
      { SVANAME: sevaDetails && sevaDetails.seva }
    );
    setSevaAmount(response.data.data[0].AMT);
  };

  HandleFetchSevaAmount();
  const HandleFetchCompanyAddress = async () => {
    const addresResponse = await axios.get("https://react-native-v-temple-b.onrender.com/api/mstcomp/");
    console.log(addresResponse.data.data[0].CompName);
    setaddressData(addresResponse.data.data[0]);

  };
  useEffect(() => {
    HandleFetchCompanyAddress();
    const interval = setInterval(() => {
      const date = new Date();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedDate = `${date.getDate()}-${
        monthNames[date.getMonth()]
      }-${date.getFullYear()}`; // Format: dd/mm/yyyy
      setCurrentDate(formattedDate);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []); // Run only once
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 999,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
      onPress={() => {
        setShowResipt(false);
        HandleSavePrint();
      }}
    >
      <View style={styles.popupContainer}>
        {/* <Image source={require('../assets/temple.png')}/> */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
           {addressData && addressData.CompName}
          </Text>
          <Text
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              width: "60%",
            }}
          >
         {addressData && addressData.Address1}
          </Text>
          <Text>{addressData && addressData.Address2}</Text>
         <Text>{addressData && addressData.Address3}</Text>
         {addressData && addressData.Address5 ? <Text>{addressData.Address5}</Text> : null}
         <Text>Ph:{addressData && addressData.MOBNO}</Text>
        </View>
        {/* Date Reciept no */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottomWidth: 1,
            borderTopWidth: 1,
          }}
        >
          <Text>Date: <Text style={{fontWeight:"bold",fontSize:13}}>{currentDate}</Text></Text>
          <Text>Reciept No: <Text style={{fontWeight:"bold",fontSize:13}}>{sevaDetails && sevaDetails.sevaReceiptID}</Text> </Text>
        </View>
        {/* Seva Details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            // marginBottom: 10,
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* Each label and value pair wrapped in its own View */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Sannidhi:</Text>
              <Text style={{ paddingLeft: 10, textAlign: "center" }}>
                {sevaDetails && sevaDetails.sannidhi}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Seva:</Text>
              <Text style={{ paddingLeft: 10 ,fontWeight:"bold",fontSize:15}}>
                {sevaDetails && sevaDetails.seva}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Name:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Gothra:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.gothra}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Rashi:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.rashi}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Mobile:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.phoneNo}
              </Text>
            </View>
          </View>
        </View>
        {/* Seva Date and amount */}
        <View style={{ borderBottomWidth: 1, borderTopWidth: 1,paddingBottom:10,paddingTop:5,}}>
          <Text style={{fontWeight:"bold",fontSize:14}}>Seva Date:{currentDate}</Text>
          
        <View style={{borderWidth:1,width:"auto",flexDirection:"row",alignItems:"center",padding:10,borderRadius:10}}>
        <FontAwesome name="rupee" size={20} color="black" />
          <Text style={{fontSize:20,marginLeft:5,marginTop:-4,fontWeight:"bold"}}>
            {sevaAmount}</Text>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  popupContainer: {
    width: "80%",
    height: "auto",
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  SevaRecieptDetails: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default SevaReciept;
